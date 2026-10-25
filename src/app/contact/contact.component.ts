import { Component, OnDestroy } from '@angular/core';
import { ClipboardService } from '../core/clipboard.service';

type StatusKind = 'success' | 'error';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnDestroy {
  readonly email = 'muhammadumersince1996@gmail.com';
  readonly phoneDisplay = '+92 336 2824377';
  readonly phoneHref = 'tel:+923362824377';
  readonly github = 'https://github.com/UmerCodes';

  name = '';
  fromEmail = '';
  subject = '';
  message = '';
  status = '';
  statusKind: StatusKind = 'success';
  submitted = false;
  emailCopied = false;

  private copyTimer?: number;
  private readonly emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private readonly clipboard: ClipboardService) {}

  get emailInvalid(): boolean {
    const email = this.fromEmail.trim();
    return this.submitted && (!email || !this.emailPattern.test(email));
  }

  ngOnDestroy(): void {
    if (this.copyTimer) {
      window.clearTimeout(this.copyTimer);
    }
  }

  async copyEmail(): Promise<void> {
    const copied = await this.clipboard.copy(this.email);

    if (copied) {
      this.emailCopied = true;
      this.setStatus('Email address copied. Paste it into Gmail, Outlook, or any mail service.', 'success');
      if (this.copyTimer) {
        window.clearTimeout(this.copyTimer);
      }
      this.copyTimer = window.setTimeout(() => {
        this.emailCopied = false;
      }, 2200);
      return;
    }

    this.setStatus('Copy did not work in this browser. Use the email address shown here.', 'error');
  }

  async copyInquiry(event: Event): Promise<void> {
    event.preventDefault();
    this.submitted = true;

    if (!this.validate()) {
      return;
    }

    const copied = await this.clipboard.copy(this.composedText());
    this.setStatus(
      copied
        ? `Message copied. Send it to ${this.email} from Gmail, Outlook, or any email service.`
        : 'Copy did not work in this browser. You can still open Gmail in a new tab instead.',
      copied ? 'success' : 'error'
    );
  }

  openGmail(): void {
    this.submitted = true;

    if (!this.validate()) {
      return;
    }

    const url =
      'https://mail.google.com/mail/?view=cm&fs=1&tf=1' +
      `&to=${encodeURIComponent(this.email)}` +
      `&su=${encodeURIComponent(this.composedSubject())}` +
      `&body=${encodeURIComponent(this.composedBody())}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    this.setStatus('Gmail compose opened in a new tab. Sign in there if you are asked.', 'success');
  }

  private validate(): boolean {
    const required: Array<{ id: string; value: string }> = [
      { id: 'contact-name', value: this.name },
      { id: 'contact-email', value: this.fromEmail },
      { id: 'contact-subject', value: this.subject },
      { id: 'contact-message', value: this.message }
    ];
    const missing = required.find(field => !field.value.trim());

    if (missing) {
      this.setStatus(
        'Please fill in your name, email, subject, and project details before continuing.',
        'error'
      );
      document.getElementById(missing.id)?.focus();
      return false;
    }

    if (!this.emailPattern.test(this.fromEmail.trim())) {
      this.setStatus('That email address does not look complete. Please check it before continuing.', 'error');
      document.getElementById('contact-email')?.focus();
      return false;
    }

    return true;
  }

  private setStatus(message: string, kind: StatusKind): void {
    this.status = message;
    this.statusKind = kind;
  }

  private composedSubject(): string {
    return this.subject.trim() || 'Project inquiry';
  }

  private composedBody(): string {
    return [
      `Name: ${this.name.trim()}`,
      `Email: ${this.fromEmail.trim()}`,
      '',
      this.message.trim()
    ].join('\n');
  }

  private composedText(): string {
    return `To: ${this.email}\nSubject: ${this.composedSubject()}\n\n${this.composedBody()}`;
  }
}
