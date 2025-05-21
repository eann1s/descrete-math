import { ReactNode } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

interface OperationTabsProps {
  tabs: string[];
  children: ReactNode | ReactNode[];
}

export const OperationTabs = ({ tabs, children }: OperationTabsProps) => {
  return (
    <Tabs>
      <TabList className="flex flex-wrap border-b mb-4">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className="px-4 py-2 cursor-pointer aria-selected:border-b-2 aria-selected:border-blue-500 aria-selected:text-blue-600 hover:text-gray-700"
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      {children &&
        (Array.isArray(children) ? children : [children]).map(
          (child, index) => <TabPanel key={index}>{child}</TabPanel>
        )}
    </Tabs>
  );
};
