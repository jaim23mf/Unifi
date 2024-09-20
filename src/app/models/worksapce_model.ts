export interface Workspaces {
    workspaces: WorkspaceClass;
}

export interface WorkspaceClass {
    workspace: Workspace[];
}

export interface Workspace {
    name: string;
    href: string;
}
