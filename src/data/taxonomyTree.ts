// Import raw taxonomy JSON directly from public assets
import taxonomyRaw from '../../public/assets/aistudio/taxonomy_09c9412b.json';

export interface TaxonomyNode {
  code: string;
  name: string;
  children?: TaxonomyNode[];
}

export interface TaxonomyData {
  nodes: TaxonomyNode[];
  levels: {
    code: string;
    name: string;
    ord: number;
  }[];
}

export const TAXONOMY: TaxonomyData = taxonomyRaw as unknown as TaxonomyData;

export const GRADE_CODE_MAP: Record<'10' | '11' | '12', string> = {
  '10': '0',
  '11': '1',
  '12': '2',
};

/**
 * Get the Grade Node (Lớp 10, 11, or 12)
 */
export function getGradeNode(grade: '10' | '11' | '12'): TaxonomyNode | undefined {
  const code = GRADE_CODE_MAP[grade];
  return TAXONOMY.nodes.find(n => n.code === code);
}

/**
 * Get branches (Phân môn con) for a grade:
 * e.g. "Đại số / Xác suất - Thống kê / Tổ hợp", "Hình học & đo lường", "Chuyên đề"
 */
export function getGradeBranches(grade: '10' | '11' | '12'): TaxonomyNode[] {
  const gradeNode = getGradeNode(grade);
  return gradeNode?.children || [];
}

/**
 * Get all chapters under a specific branch or all branches for a grade
 */
export function getGradeChapters(
  grade: '10' | '11' | '12',
  branchCode?: string
): { branch: TaxonomyNode; chapter: TaxonomyNode }[] {
  const branches = getGradeBranches(grade);
  const result: { branch: TaxonomyNode; chapter: TaxonomyNode }[] = [];

  branches.forEach(branch => {
    if (!branchCode || branch.code === branchCode) {
      branch.children?.forEach(chapter => {
        result.push({ branch, chapter });
      });
    }
  });

  return result;
}
