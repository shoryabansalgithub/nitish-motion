/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import DiscoverButton from "./DiscoverButton";
import DiscreteTabs from "./DiscreteTabs";
import FrequencySelector from "./FrequencySelector";
import FloatingMenu from "./FloatingMenu";
import ConfigurationPanel from "./ConfigurationPanel";
import NestedMenu from "./NestedMenu";
import SidebarMenu from "./SidebarMenu";
import ProjectSelector from "./ProjectSelector";
import SyncButton from "./SyncButton";
import AiToolbar from "./AiToolbar";
import InvitesWidget from "./InvitesWidget";
import SyncStatus from "./SyncStatus";
import CopyCode from "./CopyCode";
import LoadingProgress from "./LoadingProgress";
import DeleteButton from "./DeleteButton";
import SettingsSheet from "./SettingsSheet";
import OptionPicker from "./OptionPicker";
import EventReminders from "./EventReminders";
import EmojiSpreeChips from "./EmojiSpreeChips";
import AiPromptAction from "./AiPromptAction";

import DeployStatusPill from "./DeployStatusPill";
import FilterBar from "./FilterBar";

const MOCK_INTERESTS = [
  { id: '1', label: 'Photography', emoji: '📸' },
  { id: '2', label: 'Design', emoji: '🎨' },
  { id: '3', label: 'Coding', emoji: '💻' },
  { id: '4', label: 'Music', emoji: '🎵' },
  { id: '5', label: 'Travel', emoji: '✈️' },
  { id: '6', label: 'Coffee', emoji: '☕' },
  { id: '7', label: 'Reading', emoji: '📚' },
  { id: '8', label: 'Gaming', emoji: '🎮' },
  { id: '9', label: 'Fitness', emoji: '🏋️' },
  { id: '10', label: 'Cooking', emoji: '🍳' },
  { id: '11', label: 'Movies', emoji: '🍿' },
  { id: '12', label: 'Nature', emoji: '🌲' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 gap-16">
      <DiscoverButton />
      <DiscreteTabs />
      <FrequencySelector />
      <FloatingMenu />
      <ConfigurationPanel />
      <NestedMenu />
      <SidebarMenu />
      <ProjectSelector />
      <SyncButton />
      <AiToolbar />
      <InvitesWidget />
      <SyncStatus />
      <CopyCode />
      <LoadingProgress />
      <DeleteButton />
      <SettingsSheet />
      <OptionPicker />
      <EventReminders />
      <EmojiSpreeChips interests={MOCK_INTERESTS} />
      <AiPromptAction />
      <DeployStatusPill />
      <FilterBar />
    </div>
  );
}
