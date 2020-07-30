export interface FieldProps<T> {
    value: T | null;
    onChange: (value: T | null) => void;
    label: string | null | undefined;
    disabled: boolean;
    nullable: boolean;
    required: boolean;
}