// Type declarations for @ozankurt/bonfire.

export interface NotifyOptions {
    type?: 'death' | 'success' | 'info';
    /** Milliseconds; 0 keeps it until the returned cleanup is called. */
    duration?: number;
    /** Default true. */
    backdrop?: boolean;
    onComplete?: () => void;
}

export interface OnlineOptions {
    subtitle?: string | null;
    duration?: number;
    onComplete?: () => void;
}

export interface ConfirmOptions {
    subtitle?: string | null;
    yesLabel?: string;
    noLabel?: string;
    onYes?: () => void;
    onNo?: () => void;
}

export interface ChoiceOption<T> {
    label: string;
    value: T;
}

export interface ChoiceOptions<T> {
    /** Default (and for an empty list): a single "OK" option with value true. */
    options?: ChoiceOption<T>[];
    subtitle?: string | null;
    defaultIndex?: number;
    cancelValue?: T | null;
    onSelect?: (value: T) => void;
    onCancel?: () => void;
}

export interface ConfigureOptions {
    /** Default display time for notify and online, in ms. */
    duration?: number;
    /** Stylesheet URL for the EB Garamond font, or null to load no font. */
    fontUrl?: string | null;
}

/** Removes the notification immediately. */
export type Cleanup = () => void;

declare const Bonfire: {
    notify(message: string, options?: NotifyOptions): Cleanup;
    death(message?: string, options?: Omit<NotifyOptions, 'type'>): Cleanup;
    success(message?: string, options?: Omit<NotifyOptions, 'type'>): Cleanup;
    info(message: string, options?: Omit<NotifyOptions, 'type'>): Cleanup;
    online(message: string, options?: OnlineOptions): Cleanup;
    confirm(message: string, options?: ConfirmOptions): Promise<boolean>;
    choice<T = unknown>(message: string, options?: ChoiceOptions<T>): Promise<T | null>;
    configure(options: ConfigureOptions): void;
};

export default Bonfire;
