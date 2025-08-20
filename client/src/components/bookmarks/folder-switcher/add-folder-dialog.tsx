import { createFolder } from "@/api/folders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useRef } from "react";
import { useFolderStore } from "@/stores/global-state";
import { PlusIcon, type PlusIconHandle } from "@/components/ui/plus";

const formSchema = z.object({
  folderName: z.string().min(1).max(100),
});

export function AddFolderDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const addFolder = useFolderStore((s) => s.addFolder);
  const PlusIconRef = useRef<PlusIconHandle>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true); // Activa loader
    try {
      const newFolder = await createFolder(values.folderName);
      addFolder(newFolder);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="size-full p-2 justify-start font-normal text-sm text-muted-foreground hover:text-accent-foreground"
          onMouseEnter={() => PlusIconRef.current?.startAnimation()}
          onMouseLeave={() => PlusIconRef.current?.stopAnimation()}
        >
          <PlusIcon
            className="text-muted-foreground hover:text-accent-foreground"
            ref={PlusIconRef}
          />
          Add new folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add folder</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="folderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder name</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Type something..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isLoading || form.formState.isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
