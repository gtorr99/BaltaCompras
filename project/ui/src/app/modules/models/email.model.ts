export class Email {
    mailTo: string[];
    copy: string[];
    subject: string;
    text: string;

    constructor(data?: Partial<Email>) {
        Object.assign(this, data);
    }
}