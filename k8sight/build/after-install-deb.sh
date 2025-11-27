#!/bin/bash

if [[ $1 == "configure" ]]; then
	if type update-alternatives 2>/dev/null >&1; then
		if [[ -L /usr/bin/k8sight && -e /usr/bin/k8sight && "$(readlink /usr/bin/k8sight || true)" != "/etc/alternatives/k8sight" ]]; then
			rm -f /usr/bin/k8sight
		fi
		update-alternatives --install /usr/bin/k8sight k8sight /opt/K8Sight/k8sight 100 || ln -sf /opt/K8Sight/k8sight /usr/bin/k8sight
	else
		ln -sf /opt/K8Sight/k8sight /usr/bin/k8sight
	fi

	if ! { [[ -L /proc/self/ns/user ]] && unshare --user true; }; then
		chmod 4755 /opt/K8Sight/chrome-sandbox || true
	else
		chmod 0755 /opt/K8Sight/chrome-sandbox || true
	fi

	if hash apparmor_parser 2>/dev/null; then
		if apparmor_parser --skip-kernel-load --debug /etc/apparmor.d/k8sight >/dev/null 2>&1; then
			if hash aa-enabled 2>/dev/null && aa-enabled --quiet 2>/dev/null; then
				apparmor_parser --replace --write-cache --skip-read-cache /etc/apparmor.d/k8sight
			fi
		else
			if grep -qs "^[a-z]" /etc/apparmor.d/k8sight; then
				sed -i "s/^/# /" /etc/apparmor.d/k8sight
			fi
		fi
	fi
fi

# Older APT doesn't work with Github releases.

dollar='$'
if dpkg --compare-versions "$(dpkg-query -f "$dollar{Version}" -W apt || true)" lt "2.4.0"; then
	for f in /etc/apt/sources.list.d/k8sight.sources /etc/apt/sources.list.d/k8sight-nightly-builds.sources; do
		if [[ -f $f ]]; then
			if grep -qs "^[A-Z]" "$f"; then
				sed -i "s/^/# /" "$f"
			fi
		fi
	done
fi
