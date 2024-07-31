import {LightningElement, wire} from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import { reduceErrors } from 'c/ldsUtils';

const COLUMNS = [
  {label: 'First Name', fieldName: FIRSTNAME_FIELD.fieldApiName, type: 'text'},
  {label: 'Last Name', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text'},
  {label: 'Email', fieldName: EMAIL_FIELD.fieldApiName},
];  

export default class ContactList extends LightningElement {
  columns = COLUMNS;
  
  errors;
  @wire (getContacts)
  contacts;
  get errors() {
    return (this.contacts.error) ?
        reduceErrors(this.contacts.error) : [];
}
  // wiredContacts({data, error}) {
  //    if (data) {
  //      this.contacts = data;
  //      this.error = undefined;
  //    } else if (error) {
  //      this.error= reduceErrors(error);
  //      this.error = undefined;
  //    }
   
  // }
  // objectApiName = CONTACT_OBJECT;
  // fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD];

  // handleSuccess (event) {
  //   const toastEvent = new ShowToastEvent ({
  //     title: 'Contact created',
  //     message: 'Record ID: ' + event.detail.id,
  //     variant: 'success',
  //   });
  //   this.dispatchEvent (toastEvent);
  // }
}
