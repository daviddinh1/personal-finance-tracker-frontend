"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
import { Input } from "@/components/ui/input";

export const transactionSchema = z.object({
  type: z.string(),
  amount: z.coerce.number().nonnegative(),
  description: z.string(),
});

export default function AddTransactions({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "INCOME",
      amount: 0.0,
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof transactionSchema>) => {
    console.log(values);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/JSON",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            type: values.type,
            amount: values.amount,
            description: values.description,
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "Login failed");
      }

      const res = await response.json();
      console.log("🛠 API response:", res);
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      console.log("catch register error: ", error);
    }
  };
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">+ Add Transaction</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-neutral-900 p-8 rounded-lg w-96 border border-neutral-600">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-bold">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex. 100.00"
                        {...field}
                        className="bg-black border border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white fond-bold">Type</FormLabel>
                    <FormControl>
                      <Input
                        type="Type"
                        placeholder="Ex. INCOME"
                        {...field}
                        className="bg-black border border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-bold">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex. Grocery shopping"
                        {...field}
                        className="bg-black border border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 font-bold"
              >
                Enter Transaction
              </Button>
            </form>
          </Form>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
