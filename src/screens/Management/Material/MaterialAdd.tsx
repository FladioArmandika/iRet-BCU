import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { css } from "@styles/index";
import { InputField, Button } from "@components/index";
import { IconMaterialBrick, IconMaterialBrickWhite } from "@assets/icons";
import { createMaterial } from "@stores/app/action";

export default function MaterialAdd() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("wall");
  const [roughness, setRoughness] = useState("rough");
  const [thermalResistance, setThermalResistance] = useState(0);
  const [thermalAbsorptance, setThermalAbsorptance] = useState(0);
  const [solarAbsorptance, setSolarAbsorptance] = useState(0);
  const [visibleAbsorptance, setVisibleAbsorptance] = useState(0);

  const [specificHeat, setSpecificHeat] = useState(0);
  const [conductivity, setConductivity] = useState(0);
  const [density, setDensity] = useState(0);
  const [thickness, setThickness] = useState(0);

  const [image, setImage] = useState("brick-default");

  const roughnessList = ["rough", "mediumrough"];
  const imageList = ["brick-default", "brick-white"];

  const renderMaterialImage = (imageName: string) => {
    switch (imageName) {
      case "brick-default":
        return <IconMaterialBrick />;
      case "brick-white":
        return <IconMaterialBrickWhite />;
      default:
        return <IconMaterialBrick />;
    }
  };

  const clearForm = () => {
    setRoughness("rough");
    setThermalResistance(0);
    setThermalAbsorptance(0);
    setSolarAbsorptance(0);
    setVisibleAbsorptance(0);

    setSpecificHeat(0);
    setConductivity(0);
    setDensity(0);
    setThickness(0);
  };

  const saveMaterial = () => {
    let payload = {};
    if (category === "floor") {
      payload = {
        name,
        category,
        roughness: roughnessList,
        thickness,
        conductivity,
        density,
        specificHeat,
        thermalAbsorptance,
        solarAbsorptance,
        visibleAbsorptance,
        image: "",
      };
    } else {
      payload = {
        name,
        category,
        roughness: roughnessList,
        thermalResistance,
        thermalAbsorptance,
        solarAbsorptance,
        visibleAbsorptance,
        image: "",
      };
    }

    dispatch(createMaterial(payload));
    navigation.navigate("MaterialAddSuccess");
  };

  return (
    <ScrollView style={css("h-full px-4 pt-20")}>
      <Text style={css("mb-5 text-center text-lg font-bold")}>Add Material</Text>
      <View style={css("h-full w-full")}>
        <View style={css("flex flex-row")}>
          <View style={css("flex-1")}>
            <Text>Name</Text>
            <InputField placeholder='Name' value={name} onChange={(v) => setName(v)} />
          </View>
        </View>
        <View style={css("mt-4 w-full flex flex-col")}>
          <Text>Category</Text>
          <View style={css("w-full h-12 flex flex-row items-center mt-2")}>
            <View>
              <Button
                text='Wall'
                style={[
                  css("bg-gray-400 border-gray-400"),
                  { width: 100, marginRight: 10 },
                  category === "wall" ? css("bg-gray-800 border-gray-800") : css("bg-gray-400 border-gray-400"),
                ]}
                onPress={() => {
                  clearForm();
                  setCategory("wall");
                }}
              />
            </View>
            <View>
              <Button
                text='Floor'
                style={[
                  css("bg-gray-400 border-gray-400"),
                  { width: 100, marginRight: 10 },
                  category === "floor" ? css("bg-gray-800 border-gray-800") : css("bg-gray-400 border-gray-400"),
                ]}
                onPress={() => {
                  clearForm();
                  setCategory("floor");
                }}
              />
            </View>
            <View>
              <Button
                text='Roof'
                style={[
                  css("bg-gray-400 border-gray-400"),
                  { width: 100, marginRight: 10 },
                  category === "roof" ? css("bg-gray-800 border-gray-800") : css("bg-gray-400 border-gray-400"),
                ]}
                onPress={() => {
                  clearForm();
                  setCategory("roof");
                }}
              />
            </View>
          </View>
        </View>
        <View style={css("mt-4 w-full flex flex-col")}>
          <Text>Roughness</Text>
          <View style={css("w-full h-12 flex flex-row items-center mt-2 ")}>
            {roughnessList.map((r) => (
              <View>
                <Button
                  text={r}
                  style={{ width: 140, marginRight: 10 }}
                  pressed={roughness === r}
                  onPress={() => {
                    setRoughness(r);
                  }}
                />
              </View>
            ))}
          </View>
        </View>

        {category === "floor" ? (
          <View style={css("mt-4")}>
            <View style={css("flex flex-row justify-between")}>
              <View style={css("flex-1 pr-2")}>
                <Text>Thickness</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Resistance'
                  value={thickness}
                  onChange={(v) => setThickness(v)}
                />
              </View>
              <View style={css("flex-1 pl-2")}>
                <Text>Conductivity</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Conductivity'
                  value={conductivity}
                  onChange={(v) => setConductivity(v)}
                />
              </View>
            </View>
            <View style={css("flex flex-row justify-between mt-4")}>
              <View style={css("flex-1 pr-2")}>
                <Text>Density</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Density'
                  value={density}
                  onChange={(v) => setDensity(v)}
                />
              </View>
              <View style={css("flex-1 pl-2")}>
                <Text>Specific Heat</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Specific Heat'
                  value={specificHeat}
                  onChange={(v) => setSpecificHeat(v)}
                />
              </View>
            </View>
            <View style={css("flex flex-row justify-between mt-4")}>
              <View style={css("flex-1 pr-2")}>
                <Text>Solar Absorptance</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Absorptance'
                  value={solarAbsorptance}
                  onChange={(v) => setSolarAbsorptance(v)}
                />
              </View>
              <View style={css("flex-1 pl-2")}>
                <Text>Visible Absorptance</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Absorptance'
                  value={visibleAbsorptance}
                  onChange={(v) => setVisibleAbsorptance(v)}
                />
              </View>
            </View>
            <View style={css("mt-4")}>
              <Text>Thermal Resistance</Text>
              <InputField
                keyboardType='numeric'
                placeholder='Resistance'
                value={thermalResistance}
                onChange={(v) => setThermalResistance(v)}
              />
            </View>
          </View>
        ) : (
          <View style={css("mt-4")}>
            <View style={css("flex flex-row justify-between")}>
              <View style={css("flex-1 pr-2")}>
                <Text>Thermal Resistance</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Resistance'
                  value={thermalResistance}
                  onChange={(v) => setThermalResistance(v)}
                />
              </View>
              <View style={css("flex-1 pl-2")}>
                <Text>Thermal Absorptance</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Absorptance'
                  value={thermalAbsorptance}
                  onChange={(v) => setThermalAbsorptance(v)}
                />
              </View>
            </View>
            <View style={css("flex flex-row justify-between mt-4")}>
              <View style={css("flex-1 pr-2")}>
                <Text>Solar Absorptance</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Absorptance'
                  value={solarAbsorptance}
                  onChange={(v) => setSolarAbsorptance(v)}
                />
              </View>
              <View style={css("flex-1 pl-2")}>
                <Text>Visible Absorptance</Text>
                <InputField
                  keyboardType='numeric'
                  placeholder='Absorptance'
                  value={visibleAbsorptance}
                  onChange={(v) => setVisibleAbsorptance(v)}
                />
              </View>
            </View>
          </View>
        )}
        <View style={css("mt-4 w-full flex flex-col")}>
          <Text>Image</Text>
          <View style={css("w-full h-12 flex flex-row items-center mt-8 ")}>
            {imageList.map((r) => (
              <TouchableOpacity
                style={[css("flex p-4 border rounded mr-2"), image === r ? css("bg-gray-800") : {}]}
                onPress={() => setImage(r)}
              >
                {renderMaterialImage(r)}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Button text='CREATE' style={css("mt-12")} onPress={() => saveMaterial()} />
      </View>
    </ScrollView>
  );
}
