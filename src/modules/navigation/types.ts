import type {LucideIcon} from "lucide-react";
import type {LinkProps} from "@tanstack/react-router";

export interface NavigationItemInterface {
    title: string;
    icon: LucideIcon;
    path: LinkProps["to"];
    params?: LinkProps["params"];
}

export interface NavigationGroup {
    label?: string;
    items: NavigationItemInterface[];
}