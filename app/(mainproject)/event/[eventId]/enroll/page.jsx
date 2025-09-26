"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export default function UpgradePlanPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Free",
      price: "$0",
      current: true,
      conversions: "10 conversions",
      characters: "4,000 characters in input code / conversion",
      support: "Email Support",
      button: {
        label: "Current Plan",
        disabled: true,
      },
    },
    {
      name: "Pro",
      price: "$10",
      mostPopular: true,
      current: false,
      conversions: "Unlimited conversions",
      characters: "20,000 characters in input code / conversion",
      support: "Priority Email Support",
      button: {
        label: "Choose Pro",
        disabled: false,
      },
    },
    {
      name: "Premium",
      price: "$20",
      current: false,
      conversions: "Unlimited conversions",
      characters: "50,000 characters in input code / conversion",
      support: "Priority Email Support",
      button: {
        label: "Choose Premium",
        disabled: false,
      },
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="flex justify-center">
        <ToggleGroup
          type="single"
          value={billingCycle}
          onValueChange={(value) => value && setBillingCycle(value)}
          className="bg-muted p-1 rounded-lg"
        >
          <ToggleGroupItem value="monthly" className="px-4 py-2">
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem value="yearly" className="px-4 py-2">
            Yearly (Save 20%)
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.mostPopular ? "border-2 border-green-500" : ""}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                {plan.mostPopular && (
                  <Badge variant="success">Most Popular</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                {plan.price} <span className="text-base font-normal">/mo</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li>✔ {plan.conversions}</li>
                <li>✔ {plan.characters}</li>
                <li>✔ {plan.support}</li>
              </ul>
              <Button
                disabled={plan.button.disabled}
                variant={plan.current ? "outline" : "default"}
                className="w-full"
              >
                {plan.button.label}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground pt-6">
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">
            Faster Conversions with Streamed Responses
          </Badge>
          <Badge variant="secondary">Code Generation Tool</Badge>
          <Badge variant="secondary">Code Explanation Tool</Badge>
        </div>
        <div className="mt-4">14-day Money Back Guarantee · Cancel Anytime</div>
      </div>
    </div>
  );
}
