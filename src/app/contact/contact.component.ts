import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  readonly email = 'muhammadumersince1996@gmail.com';
  readonly phoneDisplay = '+92 336 2824377';
  readonly phoneHref = 'tel:+923362824377';
  readonly github = 'https://github.com/UmerCodes';

  name = '';
  fromEmail = '';
  subject = '';
  message = '';
  status = '';
  statusKind: 'info' | 'error' = 'info';

  async copyEmail(): Promise<void> {
    const copied = await this.writeClipboard(this.email);
    this.status = copied
      ? 'Email address copied. Paste it into Gmail, Outlook, or any other mail service.'
      : 'Copy did not work in this browser. Use the email address shown on the left.';
    this.statusKind = copied ? 'info' : 'error';
  }

  async copyInquiry(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.hasRequiredFields()) {
      this.status = 'Please fill in your name, email, subject, and project details first.';
      this.statusKind = 'error';
      return;
    }

    const copied = await this.writeClipboard(this.composedText());
    this.status = copied
      ? `Message copied. Send it to ${this.email} from Gmail, Outlook, or any email service — no desktop email app is required.`
      : 'Copy did not work in this browser. You can still open Gmail in a new tab below.';
    this.statusKind = copied ? 'info' : 'error';
  }

  openGmail(): void {
    if (!this.hasRequiredFields()) {
      this.status = 'Please fill in your name, email, subject, and project details first.';
      this.statusKind = 'error';
      return;
    }

    const url =
      'https://mail.google.com/mail/?view=cm&fs=1&tf=1' +
      `&to=${encodeURIComponent(this.email)}` +
      `&su=${encodeURIComponent(this.composedSubject())}` +
      `&body=${encodeURIComponent(this.composedBody())}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    this.status = 'Gmail compose opened in a new tab. Sign in there if you are asked.';
    this.statusKind = 'info';
  }

  private hasRequiredFields(): boolean {
    return Boolean(
      this.name.trim() &&
      this.fromEmail.trim() &&
      this.subject.trim() &&
      this.message.trim()
    );
  }

  private composedSubject(): string {
    return this.subject.trim() || 'Project inquiry';
  }

  private composedBody(): string {
    return [
      this.name.trim() ? `Name: ${this.name.trim()}` : '',
      this.fromEmail.trim() ? `Email: ${this.fromEmail.trim()}` : '',
      '',
      this.message.trim()
    ].filter((line, index, lines) => line !== '' || index === lines.length - 1).join('\n');
  }

  private composedText(): string {
    return `To: ${this.email}\nSubject: ${this.composedSubject()}\n\n${this.composedBody()}`;
  }

  private async writeClipboard(value: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      // Fall through to the older copy method.
    }

    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.left = '-9999px';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(field);
    return copied;
  }
}
