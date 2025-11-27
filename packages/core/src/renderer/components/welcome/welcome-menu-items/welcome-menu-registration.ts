export interface WelcomeMenuRegistration {
  title: string | (() => string);
  icon: string;
  click: () => void | Promise<void>;
}
