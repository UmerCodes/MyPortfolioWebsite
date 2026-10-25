import { Component } from '@angular/core';

export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  skills: string[];
}

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  selectedId = 'backend';

  readonly groups: SkillGroup[] = [
    {
      id: 'backend',
      title: 'Backend',
      summary: 'The core of my work: application logic, APIs, and database-driven features in C# and .NET, including both older Framework apps and more modern .NET services.',
      skills: ['C#', '.NET Framework', '.NET / .NET Core', 'ASP.NET MVC', 'ASP.NET Web API']
    },
    {
      id: 'frontend',
      title: 'Frontend',
      summary: 'I build the screens and forms that talk to those services, so users can complete tasks without a separate frontend specialist for every change.',
      skills: ['JavaScript', 'jQuery', 'Angular', 'HTML', 'CSS']
    },
    {
      id: 'database',
      title: 'Database and integration',
      summary: 'I connect applications to data and other systems, including SQL databases, Entity Framework, and REST-based integrations.',
      skills: ['SQL', 'MySQL', 'Entity Framework', 'REST APIs', 'Database integration']
    },
    {
      id: 'application',
      title: 'Application work',
      summary: 'I maintain and extend existing software: Windows services, background jobs, reporting, debugging, and improvements to established codebases.',
      skills: ['Windows Services', 'Background processing', 'Legacy application maintenance', 'Debugging and enhancement', 'Excel and PDF reporting']
    }
  ];

  get selected(): SkillGroup {
    return this.groups.find(group => group.id === this.selectedId) ?? this.groups[0];
  }

  select(id: string): void {
    this.selectedId = id;
  }
}
