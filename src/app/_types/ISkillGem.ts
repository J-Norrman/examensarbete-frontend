export interface ExplicitModifier {
    text: string;
}
  
export interface SkillGem {
    id: number;
    name: string;
    icon: string;
    category: string;
    explicitModifiers: ExplicitModifier[];
}