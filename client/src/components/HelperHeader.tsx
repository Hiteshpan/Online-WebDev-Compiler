import { Button } from './ui/button'
import { Save, Share2Icon } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { CompilerSliceStateType, updateCurrentLanguage } from '@/redux/slices/compilerSlice';
import { RootState } from '@/redux/store';
import { handleError } from '@/utils/handleError';
import axios from "axios";


export default function HelperHeader() {
    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode)
    const handleSaveCode = async () => {
        try {
            const response = await axios.post("http://localhost:3000/compiler/save", {
                fullCode: fullCode ,
            });
            console.log(response.data)
        } catch (error) {
            handleError(error);
        }
    }

    const dispatch = useDispatch();
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);
    return (
        <div className='__helper_header h-[50px] bg-black text-white p-2 flex items-center justify-between'>
            <div className='__btn_container flex gap-2'>
                <Button
                onClick={handleSaveCode}
                 variant="succes"
                    className='flex items-center justify-center gap-1'>
                    <Save size={16} />
                    Save
                </Button>
                <Button variant="secondary"
                    className='flex items-center justify-center gap-1'>
                    <Share2Icon size={16} />
                    Share
                </Button>
            </div>
            <div className='__tab_switcher flex items-center justify-center gap-2'>
                <small>Current Language :</small>
                <Select
                    defaultValue={currentLanguage}
                    onValueChange={(value) => dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]))}
                >
                    <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                </Select>

            </div>
        </div>
    )
}
