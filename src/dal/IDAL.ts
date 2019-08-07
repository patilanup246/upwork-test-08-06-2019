export interface IDAL<T> {
    GetAllRecords(page?:Number, limit?:Number):Promise<T[]>  
    InsertRecords(records:T[]): Promise<void>
}