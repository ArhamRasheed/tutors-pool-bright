// components/CountryStateCitySelector.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const CountryStateCitySelector = ({ formData, setFormData }: Props) => {
    const [countries, setCountries] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    useEffect(() => {
        axios.get("https://countriesnow.space/api/v0.1/countries/positions")
            .then(res => {
                const countryNames = res.data.data.map((c: any) => c.name);
                setCountries(countryNames);
            }).catch(console.error);
    }, []);

    const fetchStates = async (country: string) => {
        setLoadingStates(true);
        setStates([]);
        setCities([]);
        try {
            const res = await axios.post("https://countriesnow.space/api/v0.1/countries/states", { country });
            setStates(res.data.data.states.map((s: any) => s.name));
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchCities = async (country: string, state: string) => {
        setLoadingCities(true);
        setCities([]);
        try {
            const res = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", { country, state });
            setCities(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingCities(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Country */}
            <div className="space-y-2">
                <Label>Country</Label>
                <Select
                    onValueChange={(value) => {
                        handleChange("country", value);
                        handleChange("state", "");
                        handleChange("city", "");
                        fetchStates(value);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* State */}
            <div className="space-y-2">
                <Label>State / Province</Label>
                <Select
                    onValueChange={(value) => {
                        handleChange("state", value);
                        handleChange("city", "");
                        fetchCities(formData.country, value);
                    }}
                    disabled={!formData.country || loadingStates}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={loadingStates ? "Loading..." : "Select your state"} />
                    </SelectTrigger>
                    <SelectContent>
                        {states.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* City */}
            <div className="space-y-2">
                <Label>City</Label>
                <Select
                    onValueChange={(value) => handleChange("city", value)}
                    disabled={!formData.state || loadingCities}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={loadingCities ? "Loading..." : "Select your city"} />
                    </SelectTrigger>
                    <SelectContent>
                        {cities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Zip Code */}
            <div className="space-y-2">
                <Label>Zip / Postal Code</Label>
                <Input
                    placeholder="e.g. 12345"
                    value={formData.zipCode || ""}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                />
            </div>
        </div>
    );
};
