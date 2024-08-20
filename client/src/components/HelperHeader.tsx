import { Button } from './ui/button'
import { CircleCheck, CodeXml, Copy, LoaderCircle, Save, Share2 } from 'lucide-react'
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
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner';

export default function HelperHeader() {
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [shareBtn, setShareBtn] = useState<boolean>(false);
    const navigate = useNavigate()
    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode)

    const { urlId } = useParams();
    useEffect(() => {
        if (urlId) {
            setShareBtn(true);
        } else {
            setShareBtn(false);
        }
    }, [urlId]);

    const handleSaveCode = async () => {
        setSaveLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/compiler/save", {
                fullCode: fullCode,
            });
            // console.log(response.data)
            navigate(`/compiler/${response.data.url}`, { replace: true })
        } catch (error) {
            handleError(error);
        } finally {
            setSaveLoading(false);
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
                    className='flex items-center justify-center gap-1'
                    disabled={saveLoading}
                >
                    {saveLoading ? <><LoaderCircle size={16} className='animate-spin' /> Saving</> : <><Save size={16} />Save</>}
                </Button>

                {shareBtn &&
                    <Dialog>
                        <DialogTrigger
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2">

                            <Share2 size={16} />Share

                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle
                                    className='flex items-center justify-center gap-2'>
                                    <CodeXml className='font-extrabold' />Share your Code!
                                </DialogTitle>
                                <DialogDescription>
                                    <div className="__url flex items-center justify-center gap-2">
                                        <input
                                            type="text"
                                            disabled
                                            className='p-2 w-full rounded bg-slate-800 text-slate-400 my-3'
                                            value={window.location.href}
                                        />
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                window.navigator.clipboard.writeText(
                                                    window.location.href
                                                );
                                                // toast(<CircleCheck />, (`URL copied to your Clipboard`))
                                                toast(
                                                    <>
                                                        <CircleCheck className='text-green-600'/>
                                                        URL copied to your Clipboard
                                                    </>
                                                );
                                            }}
                                        >
                                            <Copy size={16} />
                                        </Button>
                                    </div>
                                    <p>Share this URL with your friends for collaboration</p>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                }

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
