import { Preset, Reskin } from "@/types";
import ChessBoard from "./ChessBoard";
import styles from "@/styles/ProfileOverview.module.css";
import { useState } from "react";
import presetService from "@/services/presetService";
import PresetsOverview from "./PresetsOverview";
import PresetCreator from "./PresetCreator";
import useSWR from "swr";

const fetchPresets = async () => {
    const presets = await presetService.getPresets();
    return { presets };
}

const ProfileOverview: React.FC = () => {
    const [ selectedPreset, setSelectedPreset ] = useState<Preset | null>(null);
    const [ loadout, setLoadout ] = useState<Reskin[]>([]);
    const [ action, setAction ] = useState<"View" | "Create">("View");
    const { data, isLoading, error } = useSWR("presets", fetchPresets);
    
    if (error) {
        return <p>Error loading presets</p>;
    }

    if (isLoading) {
        return <p>Loading presets...</p>;
    }  

    return (
        <div className={styles["profile-container"]}>
            <ChessBoard 
                reskins={loadout}
                // perspective={perspective}
            />

            <div className={styles["presets-container"]}>
                {action === "Create" ? (
                    <PresetCreator 
                        loadout={loadout}
                        setLoadout={setLoadout}
                        onConfirm={() => {
                            setAction("View");
                            fetchPresets();
                        }}
                        onCancel={() => {setAction("View")}}
                    />
                ) : (
                    <>
                    <PresetsOverview 
                        presets={data?.presets || []}
                        selectedPreset={selectedPreset}
                        onSelectPreset={(preset) => {
                            setSelectedPreset(preset);
                            setLoadout(preset.reskins);
                        }}
                        onConfirmPreset={(preset) => {
                            presetService.putActivePreset(preset.id!)
                                .then(() => fetchPresets());
                        }}
                    />
                    <button
                        onClick={() => setAction("Create")}
                    >
                        New preset
                    </button>
                    </>
                )}
        </div>
        </div>
    );
}

export default ProfileOverview;