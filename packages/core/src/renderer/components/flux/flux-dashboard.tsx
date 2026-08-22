import { Icon } from "@kubesightapp/icon";
import { cssNames } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { comparer, reaction } from "mobx";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React, { useEffect } from "react";
import subscribeStoresInjectable from "../../kube-watch-api/subscribe-stores.injectable";
import { ReactiveDuration } from "../duration/reactive-duration";
import { TabLayout } from "../layout/tab-layout-2";
import { WithTooltip } from "../with-tooltip";
import fluxActivityInjectable from "./flux-activity.injectable";
import styles from "./flux-dashboard.module.scss";
import fluxSummariesInjectable from "./flux-summaries.injectable";
import navigateToFluxResourceInjectable from "./navigate-to-flux-resource.injectable";

import type { SubscribeStores } from "../../kube-watch-api/kube-watch-api";
import type { FluxActivity, FluxActivityFeed } from "./flux-activity.injectable";
import type { FluxSummaries, FluxSummary, FluxTrouble } from "./flux-summaries.injectable";
import type { NavigateToFluxResource } from "./navigate-to-flux-resource.injectable";

interface Dependencies {
  fluxSummaries: FluxSummaries;
  fluxActivity: FluxActivityFeed;
  subscribeStores: SubscribeStores;
  navigateToFluxResource: NavigateToFluxResource;
}

const stateLabels: Record<FluxTrouble["state"], string> = {
  ready: "Ready",
  failing: "Failing",
  reconciling: "Reconciling",
  suspended: "Suspended",
};

interface SummaryCardProps {
  summary: FluxSummary;
  onOpen: () => void;
}

const SummaryCard = ({ summary, onOpen }: SummaryCardProps) => (
  <button
    type="button"
    className={cssNames(styles.card, { [styles.clickable]: Boolean(summary.primaryKind) })}
    disabled={!summary.primaryKind}
    onClick={onOpen}
    data-testid={`flux-summary-${summary.title}`}
  >
    <div className={styles.cardTitle}>
      {summary.title}
      {summary.primaryKind && <Icon material="chevron_right" small className={styles.cardChevron} />}
    </div>

    {summary.isPresent ? (
      <>
        <div className={styles.cardCount}>
          <span className={styles.cardCountValue}>
            {summary.ready}/{summary.total}
          </span>
          <span className={styles.cardCountLabel}>ready</span>
        </div>

        <div className={styles.cardStates}>
          {summary.failing > 0 && (
            <span className={cssNames(styles.state, styles.failing)}>
              <Icon material="error_outline" small />
              {summary.failing} failing
            </span>
          )}
          {summary.reconciling > 0 && (
            <span className={cssNames(styles.state, styles.reconciling)}>
              <Icon material="autorenew" small />
              {summary.reconciling} reconciling
            </span>
          )}
          {summary.suspended > 0 && (
            <span className={cssNames(styles.state, styles.suspended)}>
              <Icon material="pause_circle_outline" small />
              {summary.suspended} suspended
            </span>
          )}
        </div>
      </>
    ) : (
      <div className={styles.absent}>Not installed</div>
    )}
  </button>
);

const NonInjectedFluxDashboard = observer(
  ({ fluxSummaries, fluxActivity, subscribeStores, navigateToFluxResource }: Dependencies) => {
    /**
     * Watches every Flux store, subscribing to each one exactly once.
     *
     * Two things keep the watches alive rather than restarting every few seconds. It is a reaction,
     * not an autorun: subscribing touches observables of its own, and an autorun would track them,
     * so every incoming object would tear the watches down and rebuild them. And each store is
     * subscribed individually, so a store appearing later -- they arrive one by one as the
     * cluster's CRDs load -- leaves the existing watches untouched.
     */
    useEffect(() => {
      const subscriptions = new Map<unknown, () => void>();

      const stop = reaction(
        () => fluxSummaries.stores.get(),
        (stores) => {
          for (const store of stores) {
            if (!subscriptions.has(store)) {
              subscriptions.set(store, subscribeStores([store]));
            }
          }
        },
        { fireImmediately: true, equals: comparer.shallow },
      );

      return () => {
        stop();
        subscriptions.forEach((unsubscribe) => unsubscribe());
      };
    }, []);

    /**
     * Watches events, for the recent activity panel.
     *
     * Unlike the Flux stores this one is a single store that exists from the start, so there is
     * nothing to react to -- but the subscription still has to be made outside of render and torn
     * down with the page, and it stays in its own effect so a change to either watch cannot restart
     * the other.
     */
    useEffect(() => subscribeStores([fluxActivity.store]), []);

    const openTrouble = (trouble: FluxTrouble) =>
      navigateToFluxResource(trouble.kind, { selfLink: trouble.selfLink, search: trouble.name });

    const openActivity = (activity: FluxActivity) =>
      activity.kind && navigateToFluxResource(activity.kind, { selfLink: activity.selfLink, search: activity.name });

    const summaries = fluxSummaries.summaries.get();
    const needsAttention = fluxSummaries.needsAttention.get();
    const recentActivity = fluxActivity.activity.get();

    return (
      <TabLayout>
        <div className={styles.dashboard} data-testid="flux-dashboard">
          <div className={styles.cards}>
            {summaries.map((summary) => (
              <SummaryCard
                key={summary.title}
                summary={summary}
                onOpen={() => summary.primaryKind && navigateToFluxResource(summary.primaryKind)}
              />
            ))}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Needs attention ({needsAttention.length})</div>

            {needsAttention.length === 0 ? (
              <div className={styles.empty}>Everything Flux manages is reconciled.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Kind</th>
                    <th>Name</th>
                    <th>Namespace</th>
                    <th>State</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {needsAttention.map((trouble) => (
                    <tr
                      key={`${trouble.kind.plural}/${trouble.namespace}/${trouble.name}`}
                      className={styles.row}
                      tabIndex={0}
                      role="link"
                      title="Open details"
                      data-testid={`flux-trouble-${trouble.name}`}
                      onClick={() => openTrouble(trouble)}
                      onKeyDown={(event) => event.key === "Enter" && openTrouble(trouble)}
                    >
                      <td>{trouble.kind.kind}</td>
                      <td className={styles.name}>{trouble.name}</td>
                      <td>{trouble.namespace ?? "-"}</td>
                      <td>
                        <span className={cssNames(styles.state, styles[trouble.state])}>
                          {stateLabels[trouble.state]}
                        </span>
                      </td>
                      <td className={styles.message} title={trouble.message}>
                        {trouble.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Recent activity ({recentActivity.length})</div>

            {recentActivity.length === 0 ? (
              <div className={styles.empty}>No recent events from Flux.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Kind</th>
                    <th>Name</th>
                    <th>Namespace</th>
                    <th>Reason</th>
                    <th>Message</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr
                      key={activity.id}
                      className={cssNames({ [styles.row]: Boolean(activity.kind) })}
                      tabIndex={activity.kind ? 0 : undefined}
                      role={activity.kind ? "link" : undefined}
                      title={activity.kind ? "Open details" : undefined}
                      data-testid={`flux-activity-${activity.id}`}
                      onClick={() => openActivity(activity)}
                      onKeyDown={(event) => event.key === "Enter" && openActivity(activity)}
                    >
                      <td>{activity.kindName}</td>
                      <td className={styles.name}>{activity.name}</td>
                      <td>{activity.namespace ?? "-"}</td>
                      <td className={cssNames({ [styles.failing]: activity.isWarning })}>{activity.reason}</td>
                      <td className={styles.message} title={activity.message}>
                        {activity.message}
                      </td>
                      <td className={styles.age}>
                        <WithTooltip tooltip={activity.timestamp ? moment(activity.timestamp).toDate() : undefined}>
                          <ReactiveDuration timestamp={activity.timestamp} />
                        </WithTooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </TabLayout>
    );
  },
);

export const FluxDashboard = withInjectables<Dependencies>(NonInjectedFluxDashboard, {
  getProps: (di) => ({
    fluxSummaries: di.inject(fluxSummariesInjectable),
    fluxActivity: di.inject(fluxActivityInjectable),
    subscribeStores: di.inject(subscribeStoresInjectable),
    navigateToFluxResource: di.inject(navigateToFluxResourceInjectable),
  }),
});

FluxDashboard.displayName = "FluxDashboard";
