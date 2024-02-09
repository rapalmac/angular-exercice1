import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

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
