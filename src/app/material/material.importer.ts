import { MatInput, MatHint, MatLabel, MatError, MatFormField } from "@angular/material/input";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatButton } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatTab, MatTabBody, MatTabGroup, MatTabContent } from "@angular/material/tabs";
import { MatToolbar } from "@angular/material/toolbar";
import { MatSelect, MatOption} from "@angular/material/select";


export function importMatComponents() {    
    return [
        MatInput, MatHint, MatLabel, MatError, MatFormField,
        MatButton,
        MatTableModule,
        MatCheckbox,
        MatSelect, MatOption
    ];
}

export function importAppHeaderComponents() {
    return [
        MatTab, MatTabBody, MatTabGroup, MatTabContent,
        MatToolbar
    ];
}