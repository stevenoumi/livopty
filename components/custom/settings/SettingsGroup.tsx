import React from 'react';
import { View } from 'react-native';
import LinkedItem from '../LinkedItem';


export type SettingsGroupItem = {
  Icon: React.ComponentType<{ size: number; color?: string }>;
  title: string;
  link?: string;
  onPress?: () => void;
};

export default function SettingsGroup({ items }: { items: SettingsGroupItem[] }) {
  return (
    <View className="rounded-xl shadow-md flex-col bg-zinc-100 overflow-hidden">        
      {items.map((item, idx) => (
        <LinkedItem
          key={idx}
          Icon={item.Icon}
          title={item.title}
          link={item.link}
          onPress={item.onPress}
        />
      ))}
    </View>
    )
}

