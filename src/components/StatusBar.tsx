import React from 'react';
import type { StatusBarProps } from '../types/ui';

export const StatusBar: React.FC<StatusBarProps> = ({
  sidebar = '',
  notes = '',
  wordCount = 0,
  lineCount = 0,
}) => {
  return (
    <div className="h-6 bg-content1 border-t border-default-200 flex text-xs">
      {/* sidebar status */}
      <div className="w-64 px-3 flex items-center border-r border-default-200">
        <span className="text-default-600">
          {sidebar}
        </span>
      </div>
      
      {/* note list status */}
      <div className="w-80 px-3 flex items-center border-r border-default-200">
        <span className="text-default-600">
          {notes}
        </span>
      </div>
      
      {/* editor status */}
      <div className="flex-1 px-3 flex items-center justify-between">
        <span className="text-default-600">
          {wordCount > 0 || lineCount > 0 ? (
            <>
              words: {wordCount} | lines: {lineCount}
            </>
          ) : (
            'no content'
          )}
        </span>
        
        {/* preview */}
        <div className="flex items-center space-x-4">
          <span className="text-default-500">
            .markdown
          </span>
        </div>
      </div>
    </div>
  );
};