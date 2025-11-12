import * as React from "react"; 
import { View, TouchableOpacity } from "react-native";
import { CirclePlus } from "~/lib/icons/CirclePlus";
import { SafeAreaView } from "react-native-safe-area-context";

export default function New() {
  return (
     <SafeAreaView edges={["top",'right']} className="p-2 justify-end items-end fex-1 ">
      <TouchableOpacity  className="p-2 justify-center items-center" >
        <CirclePlus 
          className=" bg-violet-400 text-white rounded-full p-2"
          size={30} 
          strokeWidth={1.75} 
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
