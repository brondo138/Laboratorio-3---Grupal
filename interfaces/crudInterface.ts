export interface CrudInterface{
    create(): Promise<void>;
    edit(id: string): Promise<void>;
    showAll(): void;
    delete(id: string): void;
}
