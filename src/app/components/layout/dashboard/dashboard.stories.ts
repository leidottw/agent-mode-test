import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { TranslationService } from '../../../services/translation.service';

const meta: Meta<DashboardComponent> = {
  title: 'Components/Layout/Dashboard',
  component: DashboardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, TranslateModule.forRoot(), HeaderComponent, SidebarComponent],
      providers: [AuthService, ThemeService, TranslationService],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<DashboardComponent>;

export const Default: Story = {
  args: {},
};
