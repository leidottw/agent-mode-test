import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { TranslationService } from '../../../services/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

const meta: Meta<LoginComponent> = {
  title: 'Components/Auth/Login',
  component: LoginComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, TranslateModule.forRoot(), FormsModule],
      providers: [AuthService, ThemeService, TranslationService],
    }),
  ],
};

export default meta;
type Story = StoryObj<LoginComponent>;

export const Default: Story = {
  args: {},
};

export const WithError: Story = {
  args: {
    error: 'AUTH.LOGIN_ERROR',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
