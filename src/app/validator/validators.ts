import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { BaseService } from "../service/base.service";

export function createDuplicateRecordValidator(array:Array<any>, keyName:string): ValidatorFn {
    const _keyName = keyName;
    const _array:Array<any> = array;

    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        if (!_array || _array.length <= 0) {
            return null;
        }

        let index:number = array.findIndex(o => o[_keyName] == control.value);
        return index >= 0? {"duplicated": true} : null;
    };
}

export function createDuplicateValidatorByCode(baseService: BaseService<any>): ValidatorFn {

    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        let index:number = baseService.getIndexByCode(value);

        return index >= 0? {"duplicated": true} : null;
    };
}
