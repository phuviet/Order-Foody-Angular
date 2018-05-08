import { FormControl } from '@angular/forms';

export function phoneNumberValidator(control: FormControl) {
  let isValid: boolean = /^[0-9\s]{9,15}$/.test(control.value);
  // /^((\+\d{1,2}\s?\(?\d{2}\)?[\s.-]?)|\d{3})[\s.-]?\d{3,4}[\s.-]?\d{4}$/
  return (isValid || !control.value) ? null : { 'phonenumber': true };
}
