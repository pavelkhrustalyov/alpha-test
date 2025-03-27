export interface ISelectProps extends React.HTMLAttributes<HTMLSelectElement> {
    data: any[];
    value?: string | number;
    name: string;
}