import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/atoms/select";
import { Label  } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";

function LocationForm() {
  return (
    <div id="section" className=" flex flex-col  gap-5 m-1 p-1">
      {/* pais */}
      <div className="flex items-center space-x-2">
        <Label htmlFor="terms">pais</Label>
        <Select>
          <SelectTrigger className="w-full  text-actions-disable">
            <SelectValue placeholder="Select pais" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Europe & Africa</SelectLabel>
              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="cet">Central European Time (CET)</SelectItem>
              <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
              <SelectItem value="west">
                Western European Summer Time (WEST)
              </SelectItem>
              <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
              <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Asia</SelectLabel>
              <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
              <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              <SelectItem value="cst_china">
                China Standard Time (CST)
              </SelectItem>
              <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
              <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
              <SelectItem value="ist_indonesia">
                Indonesia Central Standard Time (WITA)
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Australia & Pacific</SelectLabel>
              <SelectItem value="awst">
                Australian Western Standard Time (AWST)
              </SelectItem>
              <SelectItem value="acst">
                Australian Central Standard Time (ACST)
              </SelectItem>
              <SelectItem value="aest">
                Australian Eastern Standard Time (AEST)
              </SelectItem>
              <SelectItem value="nzst">
                New Zealand Standard Time (NZST)
              </SelectItem>
              <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>South America</SelectLabel>
              <SelectItem value="art">Argentina Time (ART)</SelectItem>
              <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
              <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
              <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* provincias */}
      <div className="flex items-center space-x-2">
        <Label htmlFor="terms">provincia</Label>
        <Select>
          <SelectTrigger className="w-full  text-actions-disable">
            <SelectValue placeholder="Select provincia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Provincias</SelectLabel>
              <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
              <SelectItem value="Cordoba">Cordoba</SelectItem>
              <SelectItem value="Mendoza">Mendoza</SelectItem>
              <SelectItem value="Santa Fe">Santa Fe</SelectItem>
              <SelectItem value="tucuman">Tucuman</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
        {/* ciudad */}
        <div className="flex items-center space-x-2">
        <Label htmlFor="terms">ciudad</Label>
        <Select >
          <SelectTrigger className="w-full text-actions-disable">
            <SelectValue  placeholder="Select ciudad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Provincias</SelectLabel>
              <SelectItem value="San Miguel">San Miguel</SelectItem>
              <SelectItem value="Jose.s paz">Jose.s paz</SelectItem>            
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

        {/* dirección */}
        <div className="flex items-center space-x-2">
        <Label htmlFor="terms">direccion</Label>
        <Input type="text" placeholder="direccion" />
      </div>


    </div>
  );
}

export default LocationForm;
