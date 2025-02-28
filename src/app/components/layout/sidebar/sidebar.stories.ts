import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';

const meta: Meta<SidebarComponent> = {
  title: 'Components/Layout/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [ThemeService],
    }),
  ],
};

export default meta;
type Story = StoryObj<SidebarComponent>;

export const Default: Story = {
  args: {},
};

export const DarkTheme: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const themeService = new ThemeService();
    themeService.toggleTheme();
  },
};
