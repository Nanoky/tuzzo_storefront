export interface IDataAdapter<TData> {
    from(data: any): TData;
    to(data: TData): any;
}
