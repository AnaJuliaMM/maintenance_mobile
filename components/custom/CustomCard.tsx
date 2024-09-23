import React from "react";

// React Native Reusables components imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface CustomCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function CustomCard({ title, description, children }: CustomCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default CustomCard;
