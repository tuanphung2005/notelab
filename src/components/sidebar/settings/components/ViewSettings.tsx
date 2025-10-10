import { Card, CardBody, CardHeader, Switch } from "@heroui/react";

interface ViewSettingsProps {
  showPreview: boolean;
  showEditor: boolean;
  onTogglePreview: (show: boolean) => void;
  onToggleEditor: (show: boolean) => void;
}

export default function ViewSettings({ 
  showPreview, 
  showEditor, 
  onTogglePreview, 
  onToggleEditor 
}: ViewSettingsProps) {
  return (
    <Card radius="none" shadow="sm">
      <CardHeader className="pb-2">
        <h3 className="text-sm font-medium">view settings</h3>
      </CardHeader>
      <CardBody className="pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-foreground">show editor</span>
            <span className="text-xs text-foreground-500">
              toggle editor panel visibility
            </span>
          </div>
          <Switch
            size="sm"
            isSelected={showEditor}
            onValueChange={onToggleEditor}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-foreground">show preview</span>
            <span className="text-xs text-foreground-500">
              toggle preview panel visibility
            </span>
          </div>
          <Switch
            size="sm"
            isSelected={showPreview}
            onValueChange={onTogglePreview}
          />
        </div>
      </CardBody>
    </Card>
  );
}
