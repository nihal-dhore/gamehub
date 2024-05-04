"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import zod from "zod";
import { UserSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/libs/auth";
import { cn } from "@/lib/utils";

export const UpdateScreen = () => {
  const form = useForm<zod.output<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
  });
  const session = useSession(authOptions);
  const [update, setUpdate] = useState(false);
  const [available, setAvailable] = useState<boolean>(false);
  const [unavailable, setUnavailable] = useState(false);
  const router = useRouter();

  if (!session) {
    router.push("/");
  }

  const onSubmit: SubmitHandler<zod.output<typeof UserSchema>> = async (
    data,
    e
  ) => {
    e?.preventDefault();
    try {
      console.log(data);

      const res = await axios.post("http://localhost:3000/api/user-update", {
        username: data.username,
        bio: data.bio,
      });
      //console.log(res);

      setUpdate(true);
      router.push("/");
    } catch (error) {
      setUpdate(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      console.log(form.getValues("username"));

      const res = axios
        .get(
          `http://localhost:3000/api/available-username/${form.getValues(
            "username"
          )}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.error) {
            setUnavailable(true);
            setAvailable(false);
          }
          if (res.data.message) {
            setUnavailable(false);
            setAvailable(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      //console.log("hi");

      /* if (res.data.status === 200) {
        setAvailable(true);
      }

      if (res.data.status === 404) {
        setUnavailable(true);
      } */
    }, 2000);
    console.log(form.getValues("username"));

    return () => clearTimeout(timeId);
  }, [form.getValues("username")]);
  return (
    <div
      className={cn(
        "relative h-[91vh] w-full flex justify-center items-center z-50 bg-gray-500 bg-opacity-35",
        session.data?.user.username ? "static bg-transparent" : "relative"
      )}
    >
      <div className="w-96 rounded-xl border p-10 bg-[#171717]">
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className="text-[12px] mt-1">
                    This is your public display name.
                  </FormDescription>
                  {available && (
                    <div className="text-green-700 text-sm">
                      &#x2713; Username is available
                    </div>
                  )}
                  {unavailable && (
                    <div className="text-red-500 text-sm">
                      &#x2715; Username is not available
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className="text-[12px] ">
                    This is your public display bio.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {update && (
              <div className="text-green-700">
                &#x2713; Profile updated successfully
              </div>
            )}

            <Button
              className="mt-5"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
