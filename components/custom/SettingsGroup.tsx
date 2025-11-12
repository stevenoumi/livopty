import { View, Text } from 'react-native'
import React from 'react'
import LinkedItem from './LinkedItem'


export type SettingsGroupItem = {
  Icon: React.ComponentType<any>;
  title: string;
  link: string;
};

export default function SettingsGroup({ items }: { items: SettingsGroupItem[] }) {
  return (
    <View className="rounded-xl shadow-md flex-col bg-zinc-100 overflow-hidden">        
      {items.map((item, idx) => (
        <LinkedItem key={idx} Icon={item.Icon} title={item.title} link={item.link} />
      ))}
    </View>
    )
}

