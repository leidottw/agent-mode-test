import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { TranslationService } from '../../../services/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

const meta: Meta<HeaderComponent> = {
  title: 'Components/Layout/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [AuthService, ThemeService, TranslationService],
    }),
  ],
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {},
};

export const LoggedIn: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    // You can add interactions here using testing-library
  },
};
