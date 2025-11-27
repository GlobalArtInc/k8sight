import Joi from "joi";

import type { LogTabData, LogTabOwnerRef } from "./tab-store";

export const logTabDataValidator = Joi.object<LogTabData>({
  owner: Joi.object<LogTabOwnerRef>({
    uid: Joi.string().required(),
    name: Joi.string().required(),
    kind: Joi.string().required(),
  })
    .unknown(true)
    .optional(),
  selectedPodId: Joi.string().required(),
  namespace: Joi.string().required(),
  selectedContainer: Joi.string().optional(),
  showTimestamps: Joi.boolean().required(),
  showPrevious: Joi.boolean().required(),
});
