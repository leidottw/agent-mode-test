import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HomeComponent } from './home.component';
import { AuthService } from '../../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

const meta: Meta<HomeComponent> = {
  title: 'Components/Dashboard/Home',
  component: HomeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      providers: [AuthService],
    }),
  ],
};

export default meta;
type Story = StoryObj<HomeComponent>;

export const Default: Story = {
  args: {},
};
