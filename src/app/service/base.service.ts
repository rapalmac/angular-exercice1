
export interface BaseService<Type> {
    add(t:Type):void;
    update(t:Type):Type;
    list():Type[];
    getIndexByCode(code:string):number;
    findByCode(code:string):Type;
}