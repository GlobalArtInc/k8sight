import type React from "react";

export interface AppPreferenceComponents {
  Hint: React.ComponentType<any>;
  Input: React.ComponentType<any>;
}

export interface AppPreferenceRegistration {
  title: string;
  id?: string;
  showInPreferencesTab?: string;
  components: AppPreferenceComponents;
}

export interface RegisteredAppPreference extends AppPreferenceRegistration {
  id: string;
}
