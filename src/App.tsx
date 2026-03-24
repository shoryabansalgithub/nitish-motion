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

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 gap-16">
      <div className="w-full flex justify-center py-8">
        <ConfigurationPanel />
      </div>

      <div className="w-full flex justify-center h-[350px] items-end pb-4">
        <FloatingMenu />
      </div>

      <div className="w-full flex justify-center h-[120px]">
        <FrequencySelector />
      </div>

      <div className="w-full flex justify-center">
        <DiscreteTabs />
      </div>

      <div className="w-[480px] h-[80px] flex justify-center">
        <DiscoverButton />
      </div>

      <div className="w-full flex justify-center py-8">
        <NestedMenu />
      </div>

      <div className="w-full flex justify-center py-8">
        <SidebarMenu />
      </div>

      <div className="w-full flex justify-center py-8">
        <SyncButton />
      </div>

      <div className="w-full flex justify-center py-8">
        <ProjectSelector />
      </div>

      <div className="w-full flex justify-center py-8">
        <SettingsSheet />
      </div>

      <div className="w-full flex justify-center py-8">
        <DeleteButton />
      </div>

      <div className="w-full flex justify-center py-8">
        <LoadingProgress />
      </div>

      <div className="w-full flex justify-center py-8">
        <CopyCode />
      </div>

      <div className="w-full flex justify-center py-8">
        <SyncStatus />
      </div>

      <div className="w-full flex justify-center py-8">
        <InvitesWidget />
      </div>

      <div className="w-full flex justify-center py-8">
        <AiToolbar />
      </div>
    </div>
  );
}
