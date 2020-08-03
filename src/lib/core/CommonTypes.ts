export interface FieldProps<T> {
    value: T | null;
    onChange: (value: T | null, props?: any) => void;
    label?: string | null;
    disabled?: boolean;
    nullable?: boolean;
    required?: boolean;
}