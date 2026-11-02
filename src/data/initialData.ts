import { Lesson, Exam, UploadedExamDoc } from '../types';

export const INITIAL_LESSONS: Lesson[] = [
  // ==================== TOÁN 10 ====================
  {
    id: 't10-01',
    title: 'Mệnh đề toán học và Tập hợp',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 1. Mệnh đề. Tập hợp',
    description: 'Nắm vững khái niệm mệnh đề, mệnh đề phủ định, mệnh đề kéo theo, các phép toán giao, hợp, hiệu của hai tập hợp.',
    content: `Trong chương trình Toán 10 mới (CT GDPT 2018), Mệnh đề và Tập hợp là nền tảng tư duy logic cho toàn bộ đại số và hình học.

### 1. Mệnh đề toán học
- **Mệnh đề** là một khẳng định đúng hoặc một khẳng định sai. Một khẳng định không thể vừa đúng vừa sai.
- **Mệnh đề chứa biến**: Là khẳng định $P(x)$ mà tính đúng sai phụ thuộc vào giá trị cụ thể của biến $x$.
- Ký hiệu phổ quát $\\forall$ (với mọi) và tồn tại $\\exists$ (tồn tại ít nhất một):
  - Phủ định của $\\forall x \\in X, P(x)$ là $\\exists x \\in X, \\overline{P(x)}$.
  - Phủ định của $\\exists x \\in X, P(x)$ là $\\forall x \\in X, \\overline{P(x)}$.

### 2. Các phép toán trên tập hợp
Cho hai tập hợp $A$ và $B$:
- **Giao của hai tập hợp**: $A \\cap B = \\{x \\mid x \\in A \\text{ và } x \\in B\\}$.
- **Hợp của hai tập hợp**: $A \\cup B = \\{x \\mid x \\in A \\text{ hoặc } x \\in B\\}$.
- **Hiệu của hai tập hợp**: $A \\setminus B = \\{x \\mid x \\in A \\text{ và } x \\notin B\\}$.
- **Phần bù**: Khi $B \\subset A$, phần bù của $B$ trong $A$ là $C_A B = A \\setminus B$.`,
    keyFormulas: [
      '\\overline{\\forall x \\in X, P(x)} \\iff \\exists x \\in X, \\overline{P(x)}',
      'A \\cap B = \\{x \\mid x \\in A \\text{ và } x \\in B\\}',
      'A \\cup B = \\{x \\mid x \\in A \\text{ hoặc } x \\in B\\}',
      'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)'
    ],
    examples: [
      {
        id: 'ex-t10-01',
        title: 'Ví dụ 1: Tìm giao và hợp của hai khoảng số thực',
        question: 'Cho hai tập hợp $A = (-3; 4]$ và $B = [1; 7)$. Hãy xác định tập hợp $A \\cap B$ và $A \\cup B$.',
        solution: `Biểu diễn $A$ và $B$ trên trục số:
- $A = (-3; 4]$ bao gồm các số thực $x$ thoả mãn $-3 < x \\le 4$.
- $B = [1; 7)$ bao gồm các số thực $x$ thoả mãn $1 \\le x < 7$.

1. Giao của hai tập hợp:
$$A \\cap B = (-3; 4] \\cap [1; 7) = [1; 4]$$
2. Hợp của hai tập hợp:
$$A \\cup B = (-3; 4] \\cup [1; 7) = (-3; 7)$$`
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-01',
        question: 'Phủ định của mệnh đề "$\\forall x \\in \\mathbb{R}, x^2 + 1 > 0$" là mệnh đề nào sau đây?',
        options: {
          A: '$\\exists x \\in \\mathbb{R}, x^2 + 1 \\le 0$',
          B: '$\\exists x \\in \\mathbb{R}, x^2 + 1 < 0$',
          C: '$\\forall x \\in \\mathbb{R}, x^2 + 1 \\le 0$',
          D: '$\\exists x \\notin \\mathbb{R}, x^2 + 1 > 0$'
        },
        correctAnswer: 'A',
        explanation: 'Phủ định của mệnh đề với mọi $\\forall x \\in X, P(x)$ là $\\exists x \\in X, \\overline{P(x)}$. Vì phủ định của $x^2 + 1 > 0$ là $x^2 + 1 \\le 0$, nên mệnh đề phủ định là $\\exists x \\in \\mathbb{R}, x^2 + 1 \\le 0$.'
      }
    ],
    createdAt: '2026-09-05',
    isFeatured: true
  },
  {
    id: 't10-02',
    title: 'Bất phương trình và Hệ bất phương trình bậc nhất hai ẩn',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 2. BPT và hệ BPT bậc nhất hai ẩn',
    description: 'Biểu diễn miền nghiệm trên mặt phẳng toạ độ Oxy và bài toán tối ưu hoá quy hoạch tuyến tính thực tế.',
    content: `Bất phương trình bậc nhất hai ẩn có dạng tổng quát: $ax + by + c \\le 0$ (hoặc $<, >, \\ge$) với $a, b$ không đồng thời bằng 0.

### 1. Miền nghiệm của BPT bậc nhất hai ẩn
- Đường thẳng $d: ax + by + c = 0$ chia mặt phẳng toạ độ thành hai nửa mặt phẳng bờ $d$.
- Để xác định miền nghiệm, ta lấy một điểm $M_0(x_0; y_0) \\notin d$ (thường chọn gốc toạ độ $O(0; 0)$ nếu $c \\ne 0$) và thế vào biểu thức $ax_0 + by_0 + c$.

### 2. Hệ bất phương trình bậc nhất hai ẩn & Bài toán tối ưu
- Miền nghiệm của hệ là giao của các miền nghiệm của từng bất phương trình (thường là một miền đa giác).
- **Định lý giá trị cực trị**: Giá trị lớn nhất và nhỏ nhất của biểu thức bậc nhất $F(x, y) = ax + by$ trên một miền đa giác lồi luôn đạt tại một trong các đỉnh của đa giác đó.`,
    keyFormulas: [
      'ax + by \\le c \\quad (a^2 + b^2 \\ne 0)',
      '\\text{Max/Min } F(x, y) = ax + by \\text{ đạt tại đỉnh của miền đa giác nghiệm}'
    ],
    examples: [
      {
        id: 'ex-t10-02a',
        title: 'Ví dụ: Xác định điểm thuộc miền nghiệm',
        question: 'Điểm nào sau đây thuộc miền nghiệm của bất phương trình $2x - 3y + 6 > 0$?',
        solution: 'Thử toạ độ điểm $O(0; 0)$: $2(0) - 3(0) + 6 = 6 > 0$ (thỏa mãn). Vậy gốc toạ độ $O(0; 0)$ thuộc miền nghiệm.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-02a',
        question: 'Cặp số nào sau đây là nghiệm của hệ bất phương trình $\\begin{cases} x + y - 2 \\le 0 \\\\ 2x - 3y + 2 > 0 \\end{cases}$?',
        options: {
          A: '(0; 0)',
          B: '(1; 2)',
          C: '(2; 2)',
          D: '(0; 3)'
        },
        correctAnswer: 'A',
        explanation: 'Thay $(0; 0)$ vào hệ: $0+0-2 = -2 \\le 0$ (đúng) và $2(0)-3(0)+2 = 2 > 0$ (đúng). Vậy $(0; 0)$ là nghiệm.'
      }
    ],
    createdAt: '2026-09-10'
  },
  {
    id: 't10-03',
    title: 'Hàm số bậc hai và Đồ thị parabol',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 3. Hàm số bậc hai và đồ thị',
    description: 'Khảo sát hàm số $y = ax^2 + bx + c$, xác định toạ độ đỉnh $I$, trục đối xứng, bảng biến thiên và bài toán thực tế.',
    content: `Hàm số bậc hai có dạng $y = ax^2 + bx + c \\ (a \\ne 0)$.

### 1. Đồ thị hàm số bậc hai (Parabol)
- Toạ độ đỉnh: $I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right)$.
- Trục đối xứng: Đường thẳng $x = -\\frac{b}{2a}$.
- Bề lõm:
  - $a > 0$: Bề lõm quay lên trên, hàm số đạt giá trị nhỏ nhất tại đỉnh $I$.
  - $a < 0$: Bề lõm quay xuống dưới, hàm số đạt giá trị lớn nhất tại đỉnh $I$.

### 2. Sự biến thiên
- Với $a > 0$: Hàm số nghịch biến trên $\\left(-\\infty; -\\frac{b}{2a}\\right)$ và đồng biến trên $\\left(-\\frac{b}{2a}; +\\infty\\right)$.
- Với $a < 0$: Hàm số đồng biến trên $\\left(-\\infty; -\\frac{b}{2a}\\right)$ và nghịch biến trên $\\left(-\\frac{b}{2a}; +\\infty\\right)$.`,
    keyFormulas: [
      'I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right)',
      'x = -\\frac{b}{2a} \\text{ (Trục đối xứng)}',
      'y_{min} = -\\frac{\\Delta}{4a} \\text{ khi } a > 0; \\quad y_{max} = -\\frac{\\Delta}{4a} \\text{ khi } a < 0'
    ],
    examples: [
      {
        id: 'ex-t10-03',
        title: 'Ví dụ: Tìm toạ độ đỉnh của parabol',
        question: 'Tìm toạ độ đỉnh $I$ và trục đối xứng của parabol $(P): y = 2x^2 - 4x + 1$.',
        solution: 'Ta có $a = 2, b = -4, c = 1$. Hoành độ đỉnh: $x_I = -\\frac{-4}{2 \\times 2} = 1$. Tung độ đỉnh: $y_I = 2(1)^2 - 4(1) + 1 = -1$. Vậy $I(1; -1)$, trục đối xứng là đường thẳng $x = 1$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-03a',
        question: 'Hàm số $y = -x^2 + 2x + 3$ đồng biến trên khoảng nào?',
        options: {
          A: '(-\\infty; 1)',
          B: '(1; +\\infty)',
          C: '(-\\infty; 2)',
          D: '(2; +\\infty)'
        },
        correctAnswer: 'A',
        explanation: 'Ta có $a = -1 < 0$ và hoành độ đỉnh $x = -\\frac{b}{2a} = -\\frac{2}{2(-1)} = 1$. Vì $a < 0$, hàm số đồng biến trên $(-\\infty; 1)$.'
      }
    ],
    createdAt: '2026-09-15'
  },
  {
    id: 't10-04',
    title: 'Hệ thức lượng trong tam giác & Định lý Cosin, Sin',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 4. Hệ thức lượng trong tam giác',
    description: 'Định lý Cosin, Định lý Sin, các công thức tính diện tích tam giác và ứng dụng giải tam giác trong thực tiễn.',
    content: `Trong tam giác $ABC$, đặt $BC = a, CA = b, AB = c$, các góc tương ứng là $A, B, C$, bán kính đường tròn ngoại tiếp $R$, bán kính đường tròn nội tiếp $r$ và nửa chu vi $p = \\frac{a+b+c}{2}$.

### 1. Định lý Cosin
$$a^2 = b^2 + c^2 - 2bc \\cos A$$
$$b^2 = a^2 + c^2 - 2ac \\cos B$$
$$c^2 = a^2 + b^2 - 2ab \\cos C$$
Hệ quả tính góc:
$$\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$$

### 2. Định lý Sin
$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$

### 3. Các công thức tính diện tích tam giác
$$S = \\frac{1}{2} a h_a = \\frac{1}{2} b c \\sin A = \\frac{a b c}{4R} = p r = \\sqrt{p(p-a)(p-b)(p-c)}$$`,
    keyFormulas: [
      'a^2 = b^2 + c^2 - 2bc \\cos A',
      '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R',
      'S = \\frac{1}{2}bc \\sin A = \\frac{abc}{4R} = pr = \\sqrt{p(p-a)(p-b)(p-c)}'
    ],
    examples: [
      {
        id: 'ex-t10-04',
        title: 'Ví dụ: Tính cạnh thứ ba tam giác',
        question: 'Cho tam giác $ABC$ có $b = 8, c = 5$ và góc $\\widehat{A} = 60^\\circ$. Tính cạnh $a$.',
        solution: 'Áp dụng định lý Cosin: $a^2 = 8^2 + 5^2 - 2(8)(5)\\cos 60^\\circ = 64 + 25 - 40 = 49 \\implies a = 7$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-04',
        question: 'Tam giác $ABC$ có $a = 6, b = 8, c = 10$. Bán kính đường tròn ngoại tiếp $R$ bằng:',
        options: {
          A: '5',
          B: '10',
          C: '4',
          D: '6'
        },
        correctAnswer: 'A',
        explanation: 'Nhận xét $6^2 + 8^2 = 10^2$, tam giác vuông tại $A$, cạnh huyền $c = 10$. Bán kính $R = c/2 = 5$.'
      }
    ],
    createdAt: '2026-09-20'
  },
  {
    id: 't10-05',
    title: 'Véctơ và Các phép toán trên Véctơ',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 5. Véctơ (chưa xét tọa độ)',
    description: 'Quy tắc 3 điểm, quy tắc hình bình hành, tích của một số với véctơ và tích vô hướng.',
    content: `Véctơ là một đoạn thẳng có hướng. Điểm đầu và điểm cuối xác định hướng của véctơ.

### 1. Quy tắc cộng và trừ véctơ
- Quy tắc 3 điểm: Với 3 điểm $A, B, C$ bất kỳ, $\\vec{AB} + \\vec{BC} = \\vec{AC}$.
- Quy tắc hiệu: $\\vec{OB} - \\vec{OA} = \\vec{AB}$.
- Quy tắc hình bình hành: Nếu $ABCD$ là hình bình hành thì $\\vec{AB} + \\vec{AD} = \\vec{AC}$.

### 2. Tích vô hướng của hai véctơ
$$\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos(\\vec{a}, \\vec{b})$$
- Hai véctơ vuông góc: $\\vec{a} \\perp \\vec{b} \\iff \\vec{a} \\cdot \\vec{b} = 0$.`,
    keyFormulas: [
      '\\vec{AB} + \\vec{BC} = \\vec{AC}',
      '\\vec{a} \\cdot \\vec{b} = |\\vec{a}| |\\vec{b}| \\cos(\\vec{a}, \\vec{b})',
      '\\vec{a} \\perp \\vec{b} \\iff \\vec{a} \\cdot \\vec{b} = 0'
    ],
    examples: [
      {
        id: 'ex-t10-05',
        title: 'Ví dụ: Tính tích vô hướng',
        question: 'Cho tam giác đều $ABC$ cạnh $a$. Tính tích vô hướng $\\vec{AB} \\cdot \\vec{AC}$.',
        solution: 'Ta có $|\\vec{AB}| = a, |\\vec{AC}| = a$ và $(\\vec{AB}, \\vec{AC}) = 60^\\circ$. Do đó: $\\vec{AB} \\cdot \\vec{AC} = a \\cdot a \\cdot \\cos 60^\\circ = \\frac{a^2}{2}$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-05',
        question: 'Cho hình vuông $ABCD$ cạnh $a$. Tích vô hướng $\\vec{AB} \\cdot \\vec{AD}$ bằng:',
        options: {
          A: '0',
          B: 'a^2',
          C: '2a^2',
          D: 'a^2/2'
        },
        correctAnswer: 'A',
        explanation: 'Vì $AB \\perp AD$ trong hình vuông nên $\\cos 90^\\circ = 0$, suy ra tích vô hướng bằng 0.'
      }
    ],
    createdAt: '2026-09-22'
  },
  {
    id: 't10-06',
    title: 'Thống kê & Các số đặc trưng đo xu thế trung tâm, mức độ phân tán',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 6. Thống kê',
    description: 'Số trung bình cộng, trung vị, tứ phân vị, khoảng biến thiên, phương sai và độ lệch chuẩn.',
    content: `Thống kê mô tả cung cấp các số đo tóm tắt dữ liệu:

### 1. Số đo xu thế trung tâm
- **Số trung bình** $\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}$.
- **Trung vị** $M_e$: Giá trị ở giữa khi mẫu số liệu đã được sắp xếp tăng dần.
- **Tứ phân vị**: $Q_1$ (tứ phân vị dưới), $Q_2$ (chính là $M_e$), $Q_3$ (tứ phân vị trên).
- **Mốt** $M_o$: Giá trị có tần số xuất hiện nhiều nhất.

### 2. Số đo mức độ phân tán
- **Khoảng biến thiên**: $R = x_{max} - x_{min}$.
- **Khoảng tứ phân vị**: $\\Delta_Q = Q_3 - Q_1$.
- **Phương sai** $s^2 = \\frac{1}{n} \\sum (x_i - \\bar{x})^2$.
- **Độ lệch chuẩn**: $s = \\sqrt{s^2}$.`,
    keyFormulas: [
      '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i',
      '\\Delta_Q = Q_3 - Q_1',
      's^2 = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2, \\quad s = \\sqrt{s^2}'
    ],
    examples: [
      {
        id: 'ex-t10-06',
        title: 'Ví dụ: Tính trung vị và khoảng biến thiên',
        question: 'Cho mẫu số liệu: 4, 6, 7, 8, 9, 10, 12. Tìm số trung vị $M_e$ và khoảng biến thiên $R$.',
        solution: 'Mẫu có $n = 7$ (lẻ), giá trị chính giữa là phần tử thứ 4, do đó $M_e = 8$. Khoảng biến thiên $R = 12 - 4 = 8$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-06',
        question: 'Khoảng tứ phân vị $\\Delta_Q$ được tính bằng công thức:',
        options: {
          A: 'Q_3 - Q_1',
          B: 'Q_3 - Q_2',
          C: 'Q_2 - Q_1',
          D: 'x_{max} - x_{min}'
        },
        correctAnswer: 'A',
        explanation: 'Theo định nghĩa, khoảng tứ phân vị là hiệu số giữa tứ phân vị thứ ba và tứ phân vị thứ nhất: $\\Delta_Q = Q_3 - Q_1$.'
      }
    ],
    createdAt: '2026-09-25'
  },
  {
    id: 't10-07',
    title: 'Dấu của Tam thức bậc hai & Giải BPT bậc 2 một ẩn',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 7. Bất phương trình bậc 2 một ẩn',
    description: 'Định lý dấu tam thức bậc hai, phương pháp xét dấu bảng và giải phương trình chứa căn quy về bậc hai.',
    content: `Tam thức bậc hai $f(x) = ax^2 + bx + c \\ (a \\ne 0)$ có biệt thức $\\Delta = b^2 - 4ac$.

### 1. Định lý về dấu của tam thức bậc hai
- Nếu $\\Delta < 0$: $f(x)$ cùng dấu với hệ số $a$ với mọi $x \\in \\mathbb{R}$.
- Nếu $\\Delta = 0$: $f(x)$ cùng dấu với $a$ với mọi $x \\ne -\\frac{b}{2a}$, và $f\\left(-\\frac{b}{2a}\\right) = 0$.
- Nếu $\\Delta > 0$: $f(x)$ có 2 nghiệm phân biệt $x_1 < x_2$. Quy tắc: "Trong trái, ngoài cùng"
  - Trong khoảng $(x_1; x_2)$: $f(x)$ trái dấu với hệ số $a$.
  - Ngoài đoạn $[x_1; x_2]$: $f(x)$ cùng dấu với hệ số $a$.`,
    keyFormulas: [
      'f(x) > 0, \\forall x \\in \\mathbb{R} \\iff a > 0 \\text{ và } \\Delta < 0',
      'f(x) \\ge 0, \\forall x \\in \\mathbb{R} \\iff a > 0 \\text{ và } \\Delta \\le 0',
      '\\sqrt{f(x)} = \\sqrt{g(x)} \\iff f(x) = g(x) \\ge 0'
    ],
    examples: [
      {
        id: 'ex-t10-07',
        title: 'Ví dụ: Giải bất phương trình bậc hai',
        question: 'Giải bất phương trình: $x^2 - 5x + 6 \\le 0$.',
        solution: 'Phương trình $x^2 - 5x + 6 = 0$ có hai nghiệm $x = 2$ và $x = 3$. Hệ số $a = 1 > 0$. Theo quy tắc trong trái ngoài cùng, $f(x) \\le 0$ trên đoạn $[2; 3]$. Vậy tập nghiệm là $S = [2; 3]$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-07',
        question: 'Tập nghiệm của bất phương trình $-x^2 + 4x - 3 > 0$ là:',
        options: {
          A: '(1; 3)',
          B: '(-\\infty; 1) \\cup (3; +\\infty)',
          C: '[1; 3]',
          D: '(-3; -1)'
        },
        correctAnswer: 'A',
        explanation: 'Ta có $-x^2 + 4x - 3 = 0 \\iff x = 1$ hoặc $x = 3$. Hệ số $a = -1 < 0$. Bất phương trình $> 0$ (trái dấu với $a$) nên nghiệm nằm trong khoảng hai nghiệm: $(1; 3)$.'
      }
    ],
    createdAt: '2026-09-28'
  },
  {
    id: 't10-08',
    title: 'Đại số tổ hợp: Quy tắc đếm, Hoán vị, Chỉnh hợp, Nhị thức Newton',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 8. Đại số tổ hợp',
    description: 'Quy tắc cộng, quy tắc nhân, công thức hoán vị $P_n$, chỉnh hợp $A_n^k$, tổ hợp $C_n^k$ và khai triển nhị thức Newton.',
    content: `Đại số tổ hợp giải quyết các bài toán đếm và xác suất:

### 1. Hoán vị, Chỉnh hợp và Tổ hợp
- **Hoán vị**: Xếp thứ tự $n$ phần tử khác nhau: $P_n = n! = 1 \\times 2 \\times \\dots \\times n$.
- **Chỉnh hợp**: Chọn $k$ phần tử từ $n$ phần tử có xếp thứ tự: $A_n^k = \\frac{n!}{(n-k)!}$.
- **Tổ hợp**: Chọn $k$ phần tử từ $n$ phần tử không phân biệt thứ tự: $C_n^k = \\frac{n!}{k!(n-k)!}$.

### 2. Nhị thức Newton (với $n = 4, 5$)
$$(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$$
$$(a + b)^5 = a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5$$`,
    keyFormulas: [
      'P_n = n!',
      'A_n^k = \\frac{n!}{(n-k)!}, \\quad C_n^k = \\frac{n!}{k!(n-k)!}',
      '(a + b)^n = \\sum_{k=0}^n C_n^k a^{n-k}b^k'
    ],
    examples: [
      {
        id: 'ex-t10-08',
        title: 'Ví dụ: Chọn đại diện',
        question: 'Có bao nhiêu cách chọn một ban cán sự gồm 3 học sinh từ một tổ gồm 10 học sinh?',
        solution: 'Vì việc chọn không phân biệt thứ tự chức vụ nên số cách là: $C_{10}^3 = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120$ cách.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-08',
        question: 'Giá trị của $C_5^2$ bằng:',
        options: {
          A: '10',
          B: '20',
          C: '5',
          D: '120'
        },
        correctAnswer: 'A',
        explanation: '$C_5^2 = \\frac{5!}{2!3!} = \\frac{5 \\times 4}{2} = 10$.'
      }
    ],
    createdAt: '2026-10-01'
  },
  {
    id: 't10-09',
    title: 'Phương pháp toạ độ trong mặt phẳng Oxy (Đường thẳng, Đường tròn, Ba đường Conic)',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 9. Phương pháp toạ độ trong mặt phẳng (Oxy)',
    description: 'Phương trình tham số, tổng quát của đường thẳng, phương trình đường tròn và phương trình chính tắc của elip, hypebol, parabol.',
    content: `Trong mặt phẳng toạ độ $Oxy$:

### 1. Đường thẳng
- VTCP $\\vec{u} = (u_1; u_2)$, VTPT $\\vec{n} = (a; b)$ với $\\vec{u} \\perp \\vec{n}$.
- PT tổng quát: $ax + by + c = 0$.
- Khoảng cách từ $M_0(x_0; y_0)$ đến $\\Delta$: $d(M_0, \\Delta) = \\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.

### 2. Đường tròn
- Tâm $I(a; b)$, bán kính $R$: $(x - a)^2 + (y - b)^2 = R^2$.

### 3. Ba đường Conic
- **Elip**: $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a > b > 0, c^2 = a^2 - b^2$).
- **Hypebol**: $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ ($c^2 = a^2 + b^2$).
- **Parabol**: $y^2 = 2px$ ($p > 0$).`,
    keyFormulas: [
      'd(M_0, \\Delta) = \\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}',
      '(x - a)^2 + (y - b)^2 = R^2',
      '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (c^2 = a^2 - b^2)'
    ],
    examples: [
      {
        id: 'ex-t10-09',
        title: 'Ví dụ: Tính khoảng cách từ điểm đến đường thẳng',
        question: 'Tính khoảng cách từ điểm $M(1; -2)$ đến đường thẳng $\\Delta: 3x - 4y + 4 = 0$.',
        solution: 'Áp dụng công thức: $d(M, \\Delta) = \\frac{|3(1) - 4(-2) + 4|}{\\sqrt{3^2 + (-4)^2}} = \\frac{|3 + 8 + 4|}{5} = \\frac{15}{5} = 3$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-09',
        question: 'Đường tròn $(C): (x - 2)^2 + (y + 1)^2 = 25$ có bán kính $R$ là:',
        options: {
          A: '5',
          B: '25',
          C: '\\sqrt{5}',
          D: '10'
        },
        correctAnswer: 'A',
        explanation: 'Phương trình $(x - a)^2 + (y - b)^2 = R^2 \\implies R^2 = 25 \\implies R = 5$.'
      }
    ],
    createdAt: '2026-10-05'
  },
  {
    id: 't10-10',
    title: 'Xác suất cổ điển: Không gian mẫu và Biến cố',
    tabCategory: 'toan-10',
    grade: '10',
    chapter: 'Chương 10. Xác suất',
    description: 'Xác định không gian mẫu $\\Omega$, mô tả biến cố, định nghĩa cổ điển của xác suất $P(A) = \\frac{n(A)}{n(\\Omega)}$.',
    content: `Xác suất cổ điển được xây dựng dựa trên các phép thử ngẫu nhiên với các kết quả đồng khả năng:

### 1. Không gian mẫu và biến cố
- **Không gian mẫu** $\\Omega$: Tập hợp tất cả các kết quả có thể xảy ra của một phép thử ngẫu nhiên.
- **Biến cố** $A$: Là một tập con của không gian mẫu ($A \\subset \\Omega$).
- Biến cố không thể $\\emptyset$, biến cố chắc chắn $\\Omega$.
- Biến cố đối $\\overline{A}$: Tập các kết quả của $\\Omega$ không thuộc $A$.

### 2. Xác suất cổ điển
$$P(A) = \\frac{n(A)}{n(\\Omega)}$$
- Tính chất: $0 \\le P(A) \\le 1, \\quad P(\\overline{A}) = 1 - P(A)$.`,
    keyFormulas: [
      'P(A) = \\frac{n(A)}{n(\\Omega)}',
      'P(\\overline{A}) = 1 - P(A)',
      'P(\\emptyset) = 0, \\quad P(\\Omega) = 1'
    ],
    examples: [
      {
        id: 'ex-t10-10',
        title: 'Ví dụ: Gieo xúc xắc',
        question: 'Gieo một con xúc xắc cân đối và đồng chất một lần. Tính xác suất để xuất hiện mặt có số chấm là số nguyên tố.',
        solution: 'Không gian mẫu $\\Omega = \\{1, 2, 3, 4, 5, 6\\} \\implies n(\\Omega) = 6$. Các số nguyên tố là $\\{2, 3, 5\\} \\implies n(A) = 3$. Vậy xác suất là $P(A) = \\frac{3}{6} = \\frac{1}{2}$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t10-10',
        question: 'Gieo một đồng xu cân đối 2 lần. Số phần tử của không gian mẫu $n(\\Omega)$ là:',
        options: {
          A: '4',
          B: '2',
          C: '8',
          D: '6'
        },
        correctAnswer: 'A',
        explanation: 'Không gian mẫu là $\\Omega = \\{SS, SN, NS, NN\\}$, do đó $n(\\Omega) = 4$.'
      }
    ],
    createdAt: '2026-10-08'
  },

  // ==================== TOÁN 11 ====================
  {
    id: 't11-01',
    title: 'Hàm số lượng giác và Phương trình lượng giác',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 1. Hàm số lượng giác và phương trình lượng giác',
    description: 'Tính tuần hoàn, tập xác định, chu kì và phương pháp giải phương trình lượng giác cơ bản sin, cos, tan.',
    content: `Hàm số lượng giác là trọng tâm đại số giải tích lớp 11.

### 1. Tính tuần hoàn và chu kì
- $y = \\sin x$ tuần hoàn với chu kì $T = 2\\pi$, tập xác định $D = \\mathbb{R}$, tập giá trị $[-1; 1]$.
- $y = \\cos x$ tuần hoàn với chu kì $T = 2\\pi$, tập xác định $D = \\mathbb{R}$, tập giá trị $[-1; 1]$.
- $y = \\tan x$ tuần hoàn với chu kì $T = \\pi$, xác định khi $x \\ne \\frac{\\pi}{2} + k\\pi$.

### 2. Phương trình lượng giác cơ bản
- $\\sin x = \\sin \\alpha \\iff x = \\alpha + k2\\pi \\lor x = \\pi - \\alpha + k2\\pi$.
- $\\cos x = \\cos \\alpha \\iff x = \\pm \\alpha + k2\\pi$.
- $\\tan x = \\tan \\alpha \\iff x = \\alpha + k\\pi$.`,
    keyFormulas: [
      '\\sin x = \\sin \\alpha \\iff x = \\alpha + k2\\pi \\lor x = \\pi - \\alpha + k2\\pi',
      '\\cos x = \\cos \\alpha \\iff x = \\pm \\alpha + k2\\pi',
      '\\tan x = \\tan \\alpha \\iff x = \\alpha + k\\pi'
    ],
    examples: [
      {
        id: 'ex-t11-01',
        title: 'Ví dụ: Giải phương trình lượng giác',
        question: 'Giải phương trình $\\cos x = \\frac{1}{2}$.',
        solution: 'Ta có $\\cos x = \\cos\\left(\\frac{\\pi}{3}\\right) \\iff x = \\pm \\frac{\\pi}{3} + k2\\pi \\ (k \\in \\mathbb{Z})$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-01',
        question: 'Số nghiệm của phương trình $\\cos x = 0$ trên $(0; 3\\pi)$ là:',
        options: {
          A: '2',
          B: '3',
          C: '4',
          D: '1'
        },
        correctAnswer: 'B',
        explanation: 'Các nghiệm là $\\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\frac{5\\pi}{2}$ thuộc $(0; 3\\pi)$. Vậy có 3 nghiệm.'
      }
    ],
    createdAt: '2026-09-18',
    isFeatured: true
  },
  {
    id: 't11-02',
    title: 'Dãy số, Cấp số cộng và Cấp số nhân',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 2. Dãy số. Cấp số cộng. Cấp số nhân',
    description: 'Số hạng tổng quát, tính đơn điệu, công sai d, công bội q và tổng n số hạng đầu tiên.',
    content: `Dãy số là mô hình toán học giải quyết bài toán tăng trưởng và chuỗi số:

### 1. Cấp số cộng (CSC)
- $u_{n+1} = u_n + d$.
- Số hạng tổng quát: $u_n = u_1 + (n - 1)d$.
- Tổng $n$ số hạng đầu: $S_n = \\frac{n(u_1 + u_n)}{2} = \\frac{n[2u_1 + (n - 1)d]}{2}$.

### 2. Cấp số nhân (CSN)
- $u_{n+1} = u_n \\cdot q$.
- Số hạng tổng quát: $u_n = u_1 \\cdot q^{n-1}$.
- Tổng $n$ số hạng đầu ($q \\ne 1$): $S_n = \\frac{u_1(1 - q^n)}{1 - q}$.`,
    keyFormulas: [
      'u_n = u_1 + (n - 1)d \\quad (CSC)',
      'S_n = \\frac{n(u_1 + u_n)}{2}',
      'u_n = u_1 \\cdot q^{n-1} \\quad (CSN)',
      'S_n = \\frac{u_1(1 - q^n)}{1 - q}'
    ],
    examples: [
      {
        id: 'ex-t11-02',
        title: 'Ví dụ: Tính tổng cấp số cộng',
        question: 'Cho CSC $(u_n)$ có $u_1 = 3, d = 4$. Tính $S_{20}$.',
        solution: '$S_{20} = \\frac{20[2(3) + 19(4)]}{2} = 10(6 + 76) = 820$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-02',
        question: 'Cho CSN có $u_1 = 2, q = 3$. Giá trị $u_4$ là:',
        options: {
          A: '54',
          B: '162',
          C: '18',
          D: '24'
        },
        correctAnswer: 'A',
        explanation: '$u_4 = 2 \\times 3^3 = 54$.'
      }
    ],
    createdAt: '2026-09-25'
  },
  {
    id: 't11-03',
    title: 'Giới hạn của Dãy số và Giới hạn của Hàm số',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 3. Giới hạn. Hàm số liên tục',
    description: 'Các quy tắc tính giới hạn hữu hạn, vô cực, dạng vô định 0/0, vô cùng trừ vô cùng và hàm số liên tục.',
    content: `Giới hạn là nền tảng giải tích của đạo hàm và tích phân:

### 1. Giới hạn dãy số
- $\\lim \\frac{1}{n^k} = 0 \\ (k > 0)$.
- $\\lim q^n = 0$ khi $|q| < 1$.
- Tổng cấp số nhân lùi vô hạn: $S = \\frac{u_1}{1 - q}$.

### 2. Giới hạn hàm số & Hàm số liên tục
- $\\lim_{x \\to x_0} f(x) = L \\iff \\lim_{x \\to x_0^+} f(x) = \\lim_{x \\to x_0^-} f(x) = L$.
- Hàm số liên tục tại $x_0$: $\\lim_{x \\to x_0} f(x) = f(x_0)$.
- Định lý giá trị trung gian: Nếu $f(x)$ liên tục trên $[a; b]$ và $f(a)f(b) < 0$ thì phương trình $f(x) = 0$ có ít nhất một nghiệm trong khoảng $(a; b)$.`,
    keyFormulas: [
      '\\lim_{x \\to x_0} f(x) = f(x_0) \\text{ (Liên tục)}',
      'f(a)f(b) < 0 \\implies \\exists c \\in (a; b): f(c) = 0',
      'S = \\frac{u_1}{1 - q} \\quad (|q| < 1)'
    ],
    examples: [
      {
        id: 'ex-t11-03',
        title: 'Ví dụ: Khử dạng vô định 0/0',
        question: 'Tính $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.',
        solution: 'Ta có $\\frac{x^2 - 4}{x - 2} = \\frac{(x - 2)(x + 2)}{x - 2} = x + 2$. Khi $x \\to 2$, giới hạn bằng $2 + 2 = 4$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-03',
        question: 'Giới hạn $\\lim_{n \\to \\infty} \\frac{2n + 1}{n + 3}$ bằng:',
        options: {
          A: '2',
          B: '1',
          C: '1/3',
          D: '+\\infty'
        },
        correctAnswer: 'A',
        explanation: 'Chia cả tử và mẫu cho $n$, kết quả bằng 2.'
      }
    ],
    createdAt: '2026-09-30'
  },
  {
    id: 't11-04',
    title: 'Đường thẳng và Mặt phẳng. Quan hệ song song trong không gian',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 4. Đường thẳng, mặt phẳng. Quan hệ song song trong không gian',
    description: 'Tìm giao tuyến, giao điểm, thiết diện, đường thẳng song song mặt phẳng và hai mặt phẳng song song.',
    content: `Hình học không gian lớp 11 nghiên cứu vị trí tương đối trong không gian 3 chiều:

### 1. Đường thẳng song song mặt phẳng
- Điều kiện: Nếu đường thẳng $d$ không nằm trong $(\\alpha)$ và song song với một đường thẳng $d' \\subset (\\alpha)$ thì $d \\parallel (\\alpha)$.

### 2. Hai mặt phẳng song song
- Điều kiện: Nếu mặt phẳng $(\\alpha)$ chứa hai đường thẳng cắt nhau cùng song song với mặt phẳng $(\\beta)$ thì $(\\alpha) \\parallel (\\beta)$.
- Tính chất: Hai mặt phẳng song song chắn trên hai đường thẳng song song những đoạn thẳng bằng nhau.`,
    keyFormulas: [
      'd \\not\\subset (\\alpha), d \\parallel d\', d\' \\subset (\\alpha) \\implies d \\parallel (\\alpha)',
      'a, b \\subset (\\alpha), a \\cap b = I, a \\parallel (\\beta), b \\parallel (\\beta) \\implies (\\alpha) \\parallel (\\beta)'
    ],
    examples: [
      {
        id: 'ex-t11-04',
        title: 'Ví dụ: Xác định giao tuyến',
        question: 'Cho hình chóp $S.ABCD$ đáy là hình bình hành. Tìm giao tuyến của $(SAB)$ và $(SCD)$.',
        solution: 'Hai mặt phẳng có điểm chung $S$ và chứa $AB \\parallel CD$. Do đó giao tuyến là đường thẳng qua $S$ song song với $AB$ và $CD$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-04',
        question: 'Hai đường thẳng không có điểm chung và không cùng nằm trong một mặt phẳng gọi là:',
        options: {
          A: 'Hai đường thẳng chéo nhau',
          B: 'Hai đường thẳng song song',
          C: 'Hai đường thẳng trùng nhau',
          D: 'Hai đường thẳng cắt nhau'
        },
        correctAnswer: 'A',
        explanation: 'Định nghĩa hai đường thẳng chéo nhau trong không gian: không cùng nằm trong bất kỳ mặt phẳng nào.'
      }
    ],
    createdAt: '2026-10-04'
  },
  {
    id: 't11-05',
    title: 'Số đặc trưng đo xu thế trung tâm cho mẫu số liệu ghép nhóm',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 5. Các số đặc trưng đo xu thế trung tâm cho mẫu số liệu ghép nhóm',
    description: 'Xác định số trung bình, trung vị, tứ phân vị và mốt của mẫu số liệu chia nhóm khoảng $[a_i; a_{i+1})$.',
    content: `Khi dữ liệu lớn, ta chia thành các nhóm khoảng:

### 1. Số trung bình của mẫu ghép nhóm
$$\\bar{x} = \\frac{\\sum m_i c_i}{n}$$
Trong đó $c_i = \\frac{a_i + a_{i+1}}{2}$ là giá trị đại diện của nhóm $i$, $m_i$ là tần số.

### 2. Trung vị của mẫu ghép nhóm
$$M_e = a_p + \\frac{\\frac{n}{2} - C}{m_p} (a_{p+1} - a_p)$$`,
    keyFormulas: [
      '\\bar{x} = \\frac{1}{n} \\sum m_i c_i',
      'M_e = a_p + \\frac{\\frac{n}{2} - C}{m_p} h'
    ],
    examples: [
      {
        id: 'ex-t11-05',
        title: 'Ví dụ: Giá trị đại diện',
        question: 'Giá trị đại diện của nhóm $[40; 50)$ bằng bao nhiêu?',
        solution: 'Giá trị đại diện $c = \\frac{40 + 50}{2} = 45$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-05',
        question: 'Giá trị đại diện của khoảng thời gian $[10; 20)$ phút là:',
        options: {
          A: '15 phút',
          B: '10 phút',
          C: '20 phút',
          D: '12.5 phút'
        },
        correctAnswer: 'A',
        explanation: 'Giá trị đại diện là trung bình cộng hai đầu mút: $(10 + 20)/2 = 15$.'
      }
    ],
    createdAt: '2026-10-06'
  },
  {
    id: 't11-06',
    title: 'Hàm số Mũ và Hàm số Lôgarít',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 6. Hàm số mũ và hàm số lôgarít',
    description: 'Các phép tính luỹ thừa, định nghĩa lôgarít, hàm số $y = a^x$ và $y = \\log_a x$, giải phương trình mũ và log cơ bản.',
    content: `Luỹ thừa và Lôgarít là công cụ toán học mô hình hoá tăng trưởng lãi kép, phóng xạ hạt nhân:

### 1. Công thức Lôgarít cơ bản ($a > 0, a \\ne 1$)
- $\\log_a(xy) = \\log_a x + \\log_a y$.
- $\\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y$.
- $\\log_a(x^\\alpha) = \\alpha \\log_a x$.
- Công thức đổi cơ số: $\\log_a b = \\frac{\\log_c b}{\\log_c a}$.

### 2. Phương trình cơ bản
- $a^x = b \\iff x = \\log_a b$ (với $b > 0$).
- $\\log_a x = b \\iff x = a^b$.`,
    keyFormulas: [
      '\\log_a(xy) = \\log_a x + \\log_a y',
      '\\log_a(x^\\alpha) = \\alpha \\log_a x',
      'a^x = b \\iff x = \\log_a b \\ (b > 0)'
    ],
    examples: [
      {
        id: 'ex-t11-06',
        title: 'Ví dụ: Tính giá trị lôgarít',
        question: 'Tính giá trị của biểu thức $P = \\log_2 8 + \\log_3 9$.',
        solution: 'Ta có $\\log_2 8 = \\log_2(2^3) = 3$ và $\\log_3 9 = \\log_3(3^2) = 2$. Do đó $P = 3 + 2 = 5$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-06',
        question: 'Tập nghiệm của phương trình $\\log_3 x = 2$ là:',
        options: {
          A: '\\{9\\}',
          B: '\\{6\\}',
          C: '\\{8\\}',
          D: '\\{5\\}'
        },
        correctAnswer: 'A',
        explanation: '$\\log_3 x = 2 \\iff x = 3^2 = 9$.'
      }
    ],
    createdAt: '2026-10-09'
  },
  {
    id: 't11-07',
    title: 'Đạo hàm và Ý nghĩa hình học, vật lý',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 7. Đạo hàm',
    description: 'Định nghĩa đạo hàm, bảng đạo hàm cơ bản, phương trình tiếp tuyến của đồ thị hàm số và đạo hàm cấp hai.',
    content: `Đạo hàm mô tả tốc độ thay đổi tức thời của đại lượng:

### 1. Bảng đạo hàm các hàm số cơ bản
- $(x^n)' = n x^{n-1}$.
- $(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}$.
- $(\\sin x)' = \\cos x, \\quad (\\cos x)' = -\\sin x$.
- $(e^x)' = e^x, \\quad (\\ln x)' = \\frac{1}{x}$.

### 2. Ý nghĩa hình học (Phương trình tiếp tuyến)
Tiếp tuyến của đồ thị hàm số $y = f(x)$ tại điểm $M_0(x_0; y_0)$ có phương trình:
$$y = f'(x_0)(x - x_0) + y_0$$
Hệ số góc của tiếp tuyến là $k = f'(x_0)$.`,
    keyFormulas: [
      'y = f\'(x_0)(x - x_0) + y_0 \\text{ (PT tiếp tuyến)}',
      '(uv)\' = u\'v + uv\', \\quad \\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}',
      'v(t) = s\'(t), \\quad a(t) = v\'(t) = s\'\'(t)'
    ],
    examples: [
      {
        id: 'ex-t11-07',
        title: 'Ví dụ: Viết phương trình tiếp tuyến',
        question: 'Viết phương trình tiếp tuyến của đồ thị $y = x^2 - 3x + 2$ tại điểm $M_0(2; 0)$.',
        solution: 'Đạo hàm: $y\' = 2x - 3$. Hệ số góc tại $x_0 = 2$ là $k = y\'(2) = 2(2) - 3 = 1$. Phương trình tiếp tuyến là: $y = 1(x - 2) + 0 \\iff y = x - 2$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-07',
        question: 'Đạo hàm của hàm số $y = x^4 - 2x^2 + 1$ là:',
        options: {
          A: '4x^3 - 4x',
          B: '4x^3 - 2x',
          C: 'x^3 - 4x',
          D: '4x^3 + 4x'
        },
        correctAnswer: 'A',
        explanation: 'Áp dụng công thức đạo hàm luỹ thừa: $(x^4)\' - 2(x^2)\' = 4x^3 - 4x$.'
      }
    ],
    createdAt: '2026-10-11'
  },
  {
    id: 't11-08',
    title: 'Quan hệ vuông góc trong không gian: Góc, Khoảng cách và Thể tích',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 8. Quan hệ vuông góc trong không gian',
    description: 'Đường thẳng vuông góc mặt phẳng, hai mặt phẳng vuông góc, góc phẳng nhị diện, khoảng cách và thể tích khối đa diện.',
    content: `Quan hệ vuông góc là nền tảng để tính khoảng cách và thể tích:

### 1. Đường thẳng vuông góc với mặt phẳng
- Điều kiện: Nếu đường thẳng $d$ vuông góc với hai đường thẳng cắt nhau cùng nằm trong mặt phẳng $(\\alpha)$ thì $d \\perp (\\alpha)$.
- Tính chất: $d \\perp (\\alpha) \\implies d$ vuông góc với mọi đường thẳng nằm trong $(\\alpha)$.

### 2. Thể tích các khối đa diện cơ bản
- Khối chóp: $V = \\frac{1}{3} B h$.
- Khối lăng trụ: $V = B h$.`,
    keyFormulas: [
      'd \\perp a, d \\perp b, a \\cap b = I, a, b \\subset (\\alpha) \\implies d \\perp (\\alpha)',
      'V_{\\text{chóp}} = \\frac{1}{3} B h',
      'V_{\\text{lăng trụ}} = B h'
    ],
    examples: [
      {
        id: 'ex-t11-08',
        title: 'Ví dụ: Tính thể tích khối chóp',
        question: 'Cho hình chóp $S.ABC$ có đáy $ABC$ vuông tại $A$ với $AB = 3, AC = 4$. Chiều cao $SA = 5$ vuông góc với đáy. Tính thể tích khối chóp $S.ABC$.',
        solution: 'Diện tích đáy: $B = \\frac{1}{2} \\times 3 \\times 4 = 6$. Thể tích: $V = \\frac{1}{3} B h = \\frac{1}{3} \\times 6 \\times 5 = 10$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-08',
        question: 'Thể tích của khối chóp có diện tích đáy $B = 12$ và chiều cao $h = 5$ bằng:',
        options: {
          A: '20',
          B: '60',
          C: '30',
          D: '10'
        },
        correctAnswer: 'A',
        explanation: '$V = \\frac{1}{3} B h = \\frac{1}{3} \\times 12 \\times 5 = 20$.'
      }
    ],
    createdAt: '2026-10-13'
  },
  {
    id: 't11-09',
    title: 'Xác suất: Quy tắc nhân và Quy tắc cộng xác suất',
    tabCategory: 'toan-11',
    grade: '11',
    chapter: 'Chương 9. Xác suất',
    description: 'Biến cố giao, biến cố hợp, công thức nhân cho biến cố độc lập và công thức cộng cho biến cố xung khắc.',
    content: `Quy tắc xác suất nâng cao cho nhiều biến cố:

### 1. Quy tắc cộng xác suất
- Hai biến cố $A$ và $B$ xung khắc ($A \\cap B = \\emptyset$):
$$P(A \\cup B) = P(A) + P(B)$$
- Hai biến cố bất kỳ:
$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

### 2. Quy tắc nhân xác suất
- Hai biến cố $A$ và $B$ độc lập:
$$P(AB) = P(A) \\cdot P(B)$$`,
    keyFormulas: [
      'P(A \\cup B) = P(A) + P(B) - P(AB)',
      'P(AB) = P(A) \\cdot P(B) \\quad (\\text{Độc lập})'
    ],
    examples: [
      {
        id: 'ex-t11-09',
        title: 'Ví dụ: Hai xạ thủ bắn độc lập',
        question: 'Hai xạ thủ bắn bia độc lập. Xác suất bắn trúng của xạ thủ 1 là 0.8, xạ thủ 2 là 0.7. Tính xác suất cả hai cùng bắn trúng.',
        solution: 'Do hai biến cố độc lập: $P(AB) = P(A) \\cdot P(B) = 0.8 \\times 0.7 = 0.56$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t11-09',
        question: 'Cho hai biến cố xung khắc $A$ và $B$ có $P(A) = 0.3$ và $P(B) = 0.4$. Xác suất $P(A \\cup B)$ bằng:',
        options: {
          A: '0.7',
          B: '0.12',
          C: '0.1',
          D: '0.5'
        },
        correctAnswer: 'A',
        explanation: 'Vì hai biến cố xung khắc, $P(A \\cup B) = P(A) + P(B) = 0.3 + 0.4 = 0.7$.'
      }
    ],
    createdAt: '2026-10-15'
  },

  // ==================== TOÁN 12 ====================
  {
    id: 't12-01',
    title: 'Khảo sát sự biến thiên và Đồ thị hàm số',
    tabCategory: 'toan-12',
    grade: '12',
    chapter: 'Chương 1. Ứng dụng đạo hàm để khảo sát hàm số',
    description: 'Tính đơn điệu, cực trị, GTLN-GTNN và đường tiệm cận đứng, ngang, xiên của đồ thị hàm số.',
    content: `Khảo sát hàm số là chủ đề cốt lõi nhất chiếm 20-25% số điểm trong kì thi tốt nghiệp THPT và kỳ thi ĐGNL.

### 1. Tính đơn điệu & Cực trị
- Nếu $f'(x) \\ge 0$ trên $K$ thì hàm số đồng biến. Nếu $f'(x) \\le 0$ thì nghịch biến.
- Điểm cực đại là nơi $f'(x)$ đổi dấu từ $+$ sang $-$. Điểm cực tiểu là nơi đổi dấu từ $-$ sang $+$.

### 2. Tiệm cận của đồ thị
- Tiệm cận ngang: $\\lim_{x \\to \\pm\\infty} f(x) = y_0 \\implies y = y_0$.
- Tiệm cận đứng: $\\lim_{x \\to x_0^{\\pm}} f(x) = \\pm\\infty \\implies x = x_0$.
- Tiệm cận xiên: $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0 \\implies y = ax + b$.`,
    keyFormulas: [
      'f\'(x_0) = 0 \\text{ và } f\'\'(x_0) < 0 \\implies x_0 \\text{ là CĐ}',
      '\\lim_{x \\to \\pm \\infty} f(x) = y_0 \\implies y = y_0 \\text{ (TCN)}',
      '\\lim_{x \\to x_0^+} f(x) = \\pm \\infty \\implies x = x_0 \\text{ (TCĐ)}'
    ],
    examples: [
      {
        id: 'ex-t12-01',
        title: 'Ví dụ: Tìm tiệm cận của hàm phân thức',
        question: 'Xác định tiệm cận đứng và ngang của $y = \\frac{2x - 1}{x + 3}$.',
        solution: 'Tiệm cận đứng: $x = -3$ (mẫu số triệt tiêu). Tiệm cận ngang: $y = \\lim_{x \\to \\pm\\infty} \\frac{2x-1}{x+3} = 2$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t12-01',
        question: 'Đồ thị hàm số $y = x^3 - 3x^2 + 2$ có bao nhiêu điểm cực trị?',
        options: {
          A: '2',
          B: '0',
          C: '1',
          D: '3'
        },
        correctAnswer: 'A',
        explanation: '$y\' = 3x^2 - 6x = 3x(x - 2) = 0 \\iff x = 0$ hoặc $x = 2$. Vậy có 2 điểm cực trị.'
      }
    ],
    createdAt: '2026-10-02',
    isFeatured: true
  },
  {
    id: 't12-02',
    title: 'Toạ độ của Véc-tơ trong không gian',
    tabCategory: 'toan-12',
    grade: '12',
    chapter: 'Chương 2. Tọa độ của véc-tơ trong không gian',
    description: 'Véc-tơ trong không gian, hệ trục Oxyz, tích có hướng của hai véc-tơ và ứng dụng tính diện tích, thể tích.',
    content: `Hệ toạ độ không gian $Oxyz$ với các véc-tơ đơn vị $\\vec{i}, \\vec{j}, \\vec{k}$:

### 1. Các công thức toạ độ véc-tơ
Cho $\\vec{u} = (x_1; y_1; z_1)$ và $\\vec{v} = (x_2; y_2; z_2)$:
- Tích vô hướng: $\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2 + z_1 z_2$.
- Độ dài: $|\\vec{u}| = \\sqrt{x_1^2 + y_1^2 + z_1^2}$.
- Tích có hướng $[\\vec{u}, \\vec{v}]$: Là một véc-tơ vuông góc với cả $\\vec{u}$ và $\\vec{v}$.

### 2. Ứng dụng tích có hướng
- Diện tích tam giác: $S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]|$.
- Thể tích khối hộp: $V = |[\\vec{AB}, \\vec{AD}] \\cdot \\vec{AA'}|$.
- Thể tích tứ diện: $V = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$.`,
    keyFormulas: [
      '|\\vec{u}| = \\sqrt{x^2 + y^2 + z^2}',
      'S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]|',
      'V_{ABCD} = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|'
    ],
    examples: [
      {
        id: 'ex-t12-02',
        title: 'Ví dụ: Tính độ dài véc-tơ',
        question: 'Tính độ dài của véc-tơ $\\vec{u} = (2; -1; 2)$.',
        solution: '$|\\vec{u}| = \\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{4 + 1 + 4} = 3$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t12-02',
        question: 'Góc giữa hai véc-tơ $\\vec{i} = (1; 0; 0)$ và $\\vec{j} = (0; 1; 0)$ bằng:',
        options: {
          A: '90^\\circ',
          B: '0^\\circ',
          C: '180^\\circ',
          D: '45^\\circ'
        },
        correctAnswer: 'A',
        explanation: 'Hai trục toạ độ $Ox$ và $Oy$ vuông góc với nhau nên góc giữa hai véc-tơ đơn vị là $90^\\circ$.'
      }
    ],
    createdAt: '2026-10-10'
  },
  {
    id: 't12-03',
    title: 'Số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm',
    tabCategory: 'toan-12',
    grade: '12',
    chapter: 'Chương 3. Các số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm',
    description: 'Khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm.',
    content: `Thống kê lớp 12 hoàn thiện đo lường độ phân tán và rủi ro:

### 1. Khoảng tứ phân vị của mẫu ghép nhóm
$$\\Delta_Q = Q_3 - Q_1$$

### 2. Phương sai và Độ lệch chuẩn
$$s^2 = \\frac{1}{n} \\sum_{i=1}^k m_i (c_i - \\bar{x})^2 = \\frac{1}{n} \\sum_{i=1}^k m_i c_i^2 - (\\bar{x})^2$$
Độ lệch chuẩn: $s = \\sqrt{s^2}$. Đo lường mức độ phân tán của các số liệu xung quanh giá trị trung bình.`,
    keyFormulas: [
      '\\Delta_Q = Q_3 - Q_1',
      's^2 = \\frac{1}{n} \\sum m_i c_i^2 - (\\bar{x})^2, \\quad s = \\sqrt{s^2}'
    ],
    examples: [
      {
        id: 'ex-t12-03',
        title: 'Ví dụ: Tính phương sai',
        question: 'Một mẫu số liệu ghép nhóm có $\\bar{x} = 20$ và $\\frac{1}{n}\\sum m_i c_i^2 = 416$. Tính độ lệch chuẩn $s$.',
        solution: 'Phương sai $s^2 = 416 - 20^2 = 416 - 400 = 16$. Do đó độ lệch chuẩn $s = \\sqrt{16} = 4$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t12-03',
        question: 'Độ lệch chuẩn $s$ luôn là một số:',
        options: {
          A: 'Không âm (s \\ge 0)',
          B: 'Tuỳ ý',
          C: 'Luôn dương (s > 0)',
          D: 'Âm'
        },
        correctAnswer: 'A',
        explanation: 'Độ lệch chuẩn là căn bậc hai của phương sai, do đó luôn không âm ($s \\ge 0$).'
      }
    ],
    createdAt: '2026-10-12'
  },
  {
    id: 't12-04',
    title: 'Nguyên hàm, Tích phân và Ứng dụng tính diện tích, thể tích',
    tabCategory: 'toan-12',
    grade: '12',
    chapter: 'Chương 4. Nguyên hàm, tích phân và ứng dụng',
    description: 'Bảng nguyên hàm cơ bản, phương pháp đổi biến số, từng phần, tính diện tích hình phẳng và thể tích khối tròn xoay.',
    content: `Tích phân là công cụ giải tích mạnh mẽ trong toán học và thực tế:

### 1. Định nghĩa và Tính chất Tích phân
$$\\int_a^b f(x)dx = F(b) - F(a) = F(x)\\Big|_a^b$$
- Tích phân từng phần: $\\int u dv = uv - \\int v du$.

### 2. Ứng dụng hình học
- **Diện tích hình phẳng** giới hạn bởi đồ thị $y = f(x)$, trục $Ox$ và $x = a, x = b$:
$$S = \\int_a^b |f(x)|dx$$
- **Thể tích khối tròn xoay** quay quanh trục $Ox$:
$$V = \\pi \\int_a^b [f(x)]^2 dx$$`,
    keyFormulas: [
      '\\int_a^b f(x)dx = F(b) - F(a)',
      'S = \\int_a^b |f(x) - g(x)|dx',
      'V = \\pi \\int_a^b [f(x)]^2 dx'
    ],
    examples: [
      {
        id: 'ex-t12-04',
        title: 'Ví dụ: Tính tích phân cơ bản',
        question: 'Tính tích phân $I = \\int_0^1 (2x + 1)dx$.',
        solution: 'Nguyên hàm của $2x + 1$ là $x^2 + x$. Do đó $I = (1^2 + 1) - (0^2 + 0) = 2$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t12-04',
        question: 'Nguyên hàm của hàm số $f(x) = e^x + 2x$ là:',
        options: {
          A: 'e^x + x^2 + C',
          B: 'e^x + 2 + C',
          C: 'e^x + 2x^2 + C',
          D: 'e^{2x} + C'
        },
        correctAnswer: 'A',
        explanation: 'Ta có $\\int (e^x + 2x)dx = e^x + x^2 + C$.'
      }
    ],
    createdAt: '2026-10-14'
  },
  {
    id: 't12-05',
    title: 'Phương trình Mặt phẳng, Đường thẳng và Mặt cầu trong không gian Oxyz',
    tabCategory: 'toan-12',
    grade: '12',
    chapter: 'Chương 5. Phương trình mặt phẳng, đường thẳng, mặt cầu trong không gian Oxyz',
    description: 'Viết phương trình mặt phẳng qua VTPT, phương trình chính tắc/tham số của đường thẳng, mặt cầu và các bài toán khoảng cách, góc.',
    content: `Chủ đề hình toạ độ $Oxyz$ trọng tâm của đề thi tốt nghiệp:

### 1. Phương trình mặt phẳng
- VTPT $\\vec{n} = (A; B; C)$, qua $M_0(x_0; y_0; z_0)$:
$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\iff Ax + By + Cz + D = 0$$
- Khoảng cách: $d(M, (\\alpha)) = \\frac{|Ax_M + By_M + Cz_M + D|}{\\sqrt{A^2 + B^2 + C^2}}$.

### 2. Phương trình đường thẳng
- VTCP $\\vec{u} = (a; b; c)$, qua $M_0(x_0; y_0; z_0)$:
$$\\text{Tham số: } \\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases} \\quad \\text{Chính tắc: } \\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c}$$

### 3. Phương trình mặt cầu
$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$$`,
    keyFormulas: [
      'Ax + By + Cz + D = 0 \\quad (\\text{Mặt phẳng})',
      '\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c} \\quad (\\text{Đường thẳng})',
      'd(M, (\\alpha)) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}'
    ],
    examples: [
      {
        id: 'ex-t12-05',
        title: 'Ví dụ: Tìm toạ độ tâm và bán kính mặt cầu',
        question: 'Xác định tâm và bán kính của $(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$.',
        solution: 'Tâm $I(1; -2; 3)$, bán kính $R = \\sqrt{16} = 4$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t12-05',
        question: 'Véc-tơ nào sau đây là một VTPT của mặt phẳng $(\\alpha): 2x - 3y + z - 5 = 0$?',
        options: {
          A: '\\vec{n} = (2; -3; 1)',
          B: '\\vec{n} = (2; 3; 1)',
          C: '\\vec{n} = (-2; -3; 1)',
          D: '\\vec{n} = (2; -3; -5)'
        },
        correctAnswer: 'A',
        explanation: 'Hệ số trước $x, y, z$ chính là toạ độ VTPT: $(2; -3; 1)$.'
      }
    ],
    createdAt: '2026-10-16'
  },
  {
    id: 't12-06',
    title: 'Xác suất có điều kiện và Công thức Bayes',
    tabCategory: 'toan-12',
    grade: '12',
    chapter: 'Chương 6. Một số yếu tố xác suất',
    description: 'Xác suất có điều kiện $P(A|B)$, công thức nhân tổng quát, công thức xác suất toàn phần và công thức Bayes.',
    content: `Chủ đề mới trong chương trình Toán 12 (CT GDPT 2018):

### 1. Xác suất có điều kiện
Xác suất của biến cố $A$ với điều kiện biến cố $B$ đã xảy ra ($P(B) > 0$):
$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$$

### 2. Công thức xác suất toàn phần
Nếu hệ biến cố $B_1, B_2, \\dots, B_n$ là một nhóm biến cố đầy đủ:
$$P(A) = \\sum_{i=1}^n P(B_i) \\cdot P(A \\mid B_i)$$

### 3. Công thức Bayes
$$P(B_k \\mid A) = \\frac{P(B_k) \\cdot P(A \\mid B_k)}{P(A)} = \\frac{P(B_k) \\cdot P(A \\mid B_k)}{\\sum_{i=1}^n P(B_i) \\cdot P(A \\mid B_i)}$$`,
    keyFormulas: [
      'P(A \\mid B) = \\frac{P(AB)}{P(B)}',
      'P(A) = P(B)P(A|B) + P(\\overline{B})P(A|\\overline{B})',
      'P(B \\mid A) = \\frac{P(B)P(A|B)}{P(A)} \\text{ (Công thức Bayes)}'
    ],
    examples: [
      {
        id: 'ex-t12-06',
        title: 'Ví dụ: Tính xác suất có điều kiện',
        question: 'Cho $P(A) = 0.4, P(B) = 0.5$ và $P(AB) = 0.2$. Tính $P(A \\mid B)$.',
        solution: 'Áp dụng công thức: $P(A \\mid B) = \\frac{P(AB)}{P(B)} = \\frac{0.2}{0.5} = 0.4$.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-t12-06',
        question: 'Công thức tính xác suất có điều kiện $P(B \\mid A)$ khi $P(A) > 0$ là:',
        options: {
          A: 'P(AB) / P(A)',
          B: 'P(AB) / P(B)',
          C: 'P(A) / P(B)',
          D: 'P(A) + P(B)'
        },
        correctAnswer: 'A',
        explanation: 'Theo định nghĩa xác suất có điều kiện: $P(B \\mid A) = \\frac{P(AB)}{P(A)}$.'
      }
    ],
    createdAt: '2026-10-18'
  }
];

export const INITIAL_EXAMS: Exam[] = [
  // ==================== ĐỀ THI GHK - HK ====================
  {
    id: 'exam-ghk-01',
    title: 'Đề Thi Thử Giữa Học Kì 1 - Toán 12 (Chuẩn Cấu Trúc Mới)',
    tabCategory: 'ghk-hk',
    gradeTarget: '12',
    examType: 'Giữa HK1',
    timeMinutes: 90,
    totalQuestions: 6,
    maxScore: 10,
    year: '2026',
    description: 'Đề kiểm tra trọng tâm Khảo sát sự biến thiên hàm số, Giá trị lớn nhất - nhỏ nhất, Đường tiệm cận và Ứng dụng thực tế.',
    pdfUrl: 'https://moet.gov.vn/de-thi-thu-ghk1-toan12.pdf',
    createdAt: '2026-10-15',
    isOfficialFormat: true,
    questions: [
      {
        id: 'ghk-q1',
        chapter: 'Khảo sát hàm số',
        difficulty: 'Nhận biết',
        question: 'Cho hàm số $y = f(x)$ có bảng xét dấu đạo hàm như sau: $f\'(x) > 0$ trên $(-\\infty; -1)$ và $(2; +\\infty)$, $f\'(x) < 0$ trên $(-1; 2)$. Hàm số đã cho nghịch biến trên khoảng nào?',
        options: {
          A: '(-1; 2)',
          B: '(-\\infty; -1)',
          C: '(2; +\\infty)',
          D: '(-1; +\\infty)'
        },
        correctAnswer: 'A',
        explanation: 'Hàm số nghịch biến trên khoảng mà đạo hàm mang dấu âm ($f\'(x) < 0$). Theo bảng xét dấu, $f\'(x) < 0$ trên khoảng $(-1; 2)$, do đó hàm số nghịch biến trên $(-1; 2)$.'
      },
      {
        id: 'ghk-q2',
        chapter: 'Cực trị hàm số',
        difficulty: 'Thông hiểu',
        question: 'Điểm cực đại của đồ thị hàm số $y = -x^3 + 3x + 1$ là:',
        options: {
          A: '(1; 3)',
          B: '(-1; -1)',
          C: 'x = 1',
          D: '(0; 1)'
        },
        correctAnswer: 'A',
        explanation: 'Đạo hàm $y\' = -3x^2 + 3 = -3(x^2 - 1) = 0 \\iff x = \\pm 1$. Vì hệ số $a = -3 < 0$, $y\'$ đổi dấu từ $+$ sang $-$ khi qua $x = 1$, nên $x = 1$ là điểm cực đại của hàm số. Toạ độ điểm cực đại của đồ thị là $(1; y(1)) = (1; -1 + 3 + 1) = (1; 3)$.'
      },
      {
        id: 'ghk-q3',
        chapter: 'Đường tiệm cận',
        difficulty: 'Thông hiểu',
        question: 'Số đường tiệm cận đứng và tiệm cận ngang của đồ thị hàm số $y = \\frac{2x + 1}{\\sqrt{x^2 - 4}}$ là:',
        options: {
          A: '4',
          B: '3',
          C: '2',
          D: '1'
        },
        correctAnswer: 'A',
        explanation: 'Tập xác định: $D = (-\\infty; -2) \\cup (2; +\\infty)$.\n- Tiệm cận đứng: $x = -2$ và $x = 2$ (2 đường).\n- Tiệm cận ngang: $y = 2$ và $y = -2$ (2 đường).\nTổng số đường tiệm cận là $2 + 2 = 4$.'
      },
      {
        id: 'ghk-q4',
        chapter: 'Toạ độ Oxyz',
        difficulty: 'Nhận biết',
        question: 'Trong không gian $Oxyz$, hình chiếu vuông góc của điểm $M(2; -3; 5)$ lên mặt phẳng toạ độ $(Oxy)$ có toạ độ là:',
        options: {
          A: '(2; -3; 0)',
          B: '(2; 0; 5)',
          C: '(0; -3; 5)',
          D: '(0; 0; 5)'
        },
        correctAnswer: 'A',
        explanation: 'Hình chiếu vuông góc của điểm $M(x_0; y_0; z_0)$ lên mặt phẳng toạ độ $(Oxy)$ có cao độ triệt tiêu $z = 0$, giữ nguyên hoành độ và tung độ: $(2; -3; 0)$.'
      },
      {
        id: 'ghk-q5',
        chapter: 'Toạ độ Oxyz',
        difficulty: 'Vận dụng',
        question: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\alpha): 2x - y + 2z - 6 = 0$. Khoảng cách từ gốc toạ độ $O$ đến mặt phẳng $(\\alpha)$ bằng:',
        options: {
          A: '2',
          B: '6',
          C: '3',
          D: '1'
        },
        correctAnswer: 'A',
        explanation: 'Khoảng cách: $d(O, (\\alpha)) = \\frac{|-6|}{\\sqrt{2^2 + (-1)^2 + 2^2}} = \\frac{6}{3} = 2$.'
      },
      {
        id: 'ghk-q6',
        chapter: 'Ứng dụng thực tế',
        difficulty: 'Vận dụng cao',
        question: 'Một người thợ muốn làm một chiếc hộp hình chữ nhật không nắp từ một tấm tôn hình vuông cạnh $60\\text{ cm}$ bằng cách cắt bốn góc bốn hình vuông nhỏ bằng nhau cạnh $x\\text{ cm}$ rồi gập mép lên. Thể tích chiếc hộp đạt giá trị lớn nhất khi $x$ bằng bao nhiêu?',
        options: {
          A: '10 cm',
          B: '15 cm',
          C: '20 cm',
          D: '5 cm'
        },
        correctAnswer: 'A',
        explanation: 'Thể tích: $V(x) = x(60 - 2x)^2$. Đạo hàm $V\'(x) = 0 \\iff x = 10\\text{ cm}$.'
      }
    ]
  },
  {
    id: 'exam-ghk-02',
    title: 'Đề Thi Thử Cuối Học Kì 1 - Toán 11',
    tabCategory: 'ghk-hk',
    gradeTarget: '11',
    examType: 'Cuối HK1',
    timeMinutes: 60,
    totalQuestions: 4,
    maxScore: 10,
    year: '2026',
    description: 'Nội dung kiểm tra: Hàm số lượng giác, Cấp số cộng, Cấp số nhân và Giới hạn dãy số.',
    createdAt: '2026-10-18',
    isOfficialFormat: false,
    questions: [
      {
        id: 'ghk-11-q1',
        chapter: 'Lượng giác',
        difficulty: 'Thông hiểu',
        question: 'Tập xác định của hàm số $y = \\tan\\left(x - \\frac{\\pi}{4}\\right)$ là:',
        options: {
          A: '$\\mathbb{R} \\setminus \\left\\{\\frac{3\\pi}{4} + k\\pi, k \\in \\mathbb{Z}\\right\\}$',
          B: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$',
          C: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\pi, k \\in \\mathbb{Z}\\right\\}$',
          D: '$\\mathbb{R}$'
        },
        correctAnswer: 'A',
        explanation: 'Hàm số xác định khi $x - \\frac{\\pi}{4} \\ne \\frac{\\pi}{2} + k\\pi \\iff x \\ne \\frac{3\\pi}{4} + k\\pi$.'
      },
      {
        id: 'ghk-11-q2',
        chapter: 'Giới hạn',
        difficulty: 'Nhận biết',
        question: 'Giới hạn $\\lim_{n \\to \\infty} \\frac{3n^2 - 2n + 1}{n^2 + 5}$ bằng:',
        options: {
          A: '3',
          B: '0',
          C: '1/5',
          D: '+\\infty'
        },
        correctAnswer: 'A',
        explanation: 'Chia cả tử và mẫu cho $n^2$, kết quả bằng 3.'
      },
      {
        id: 'ghk-11-q3',
        chapter: 'Cấp số cộng',
        difficulty: 'Thông hiểu',
        question: 'Một rạp hát có 15 hàng ghế, hàng đầu có 12 ghế, mỗi hàng sau hơn hàng trước 3 ghế. Tổng số ghế trong rạp là:',
        options: {
          A: '495 ghế',
          B: '540 ghế',
          C: '480 ghế',
          D: '510 ghế'
        },
        correctAnswer: 'A',
        explanation: '$S_{15} = \\frac{15[2(12) + 14(3)]}{2} = 15 \\times 33 = 495$ ghế.'
      },
      {
        id: 'ghk-11-q4',
        chapter: 'Hình không gian',
        difficulty: 'Thông hiểu',
        question: 'Cho hình chóp $S.ABCD$ đáy là hình bình hành. Giao tuyến của $(SAB)$ và $(SCD)$ là:',
        options: {
          A: 'Đường thẳng qua S và song song với AB, CD',
          B: 'Đoạn thẳng nối S với tâm O đáy',
          C: 'Đường thẳng qua S vuông góc với đáy',
          D: 'Hai mặt phẳng không có điểm chung'
        },
        correctAnswer: 'A',
        explanation: 'Giao tuyến song song với $AB$ và $CD$.'
      }
    ]
  },

  // ==================== ĐỀ THI ĐÁNH GIÁ NĂNG LỰC ====================
  {
    id: 'exam-dgnl-01',
    title: 'Đề Thi Thử ĐGNL ĐHQG-HCM - Phần Toán Học & Tư Duy Định Lượng',
    tabCategory: 'dgnl',
    gradeTarget: 'ĐGNL',
    examType: 'ĐGNL ĐHQG-HCM',
    timeMinutes: 75,
    totalQuestions: 6,
    maxScore: 300,
    year: '2026',
    description: 'Mô phỏng 100% cấu trúc phần Tư duy định lượng & Giải quyết vấn đề toán học thực tế của ĐHQG TP.HCM.',
    pdfUrl: 'https://vnuhcm.edu.vn/de-thi-thu-dgnl-toan-hoc.pdf',
    createdAt: '2026-10-20',
    isOfficialFormat: true,
    questions: [
      {
        id: 'dgnl-q1',
        chapter: 'Tư duy logic & Đại số',
        difficulty: 'Thông hiểu',
        question: 'Một lớp có 45 học sinh, trong đó có 25 em thích môn Toán, 20 em thích môn Tin học, và 8 em không thích cả hai môn này. Hỏi có bao nhiêu em thích cả hai môn Toán và Tin học?',
        options: {
          A: '8 học sinh',
          B: '10 học sinh',
          C: '12 học sinh',
          D: '15 học sinh'
        },
        correctAnswer: 'A',
        explanation: '$45 - 8 = 37$. $n(T \\cap TI) = 25 + 20 - 37 = 8$ học sinh.'
      },
      {
        id: 'dgnl-q2',
        chapter: 'Toán ứng dụng kinh tế',
        difficulty: 'Vận dụng',
        question: 'Một người gửi tiết kiệm 200 triệu đồng vào ngân hàng với lãi suất 6,5%/năm. Hỏi sau ít nhất bao nhiêu năm người đó nhận được số tiền vượt quá 350 triệu đồng?',
        options: {
          A: '9 năm',
          B: '8 năm',
          C: '10 năm',
          D: '7 năm'
        },
        correctAnswer: 'A',
        explanation: '$200 \\times (1{,}065)^n > 350 \\iff n > \\log_{1{,}065}(1{,}75) \\approx 8{,}89 \\implies 9$ năm.'
      },
      {
        id: 'dgnl-q3',
        chapter: 'Phân tích số liệu & Biểu đồ',
        difficulty: 'Thông hiểu',
        question: 'Doanh thu quý 1 tăng 20% so với quý 4 năm trước. Quý 2 giảm 15% so với quý 1. So với quý 4 năm trước, doanh thu quý 2 biến động như thế nào?',
        options: {
          A: 'Tăng 2%',
          B: 'Tăng 5%',
          C: 'Giảm 2%',
          D: 'Giữ nguyên'
        },
        correctAnswer: 'A',
        explanation: '$1{,}2 \\times 0{,}85 = 1{,}02$, tức là tăng 2%.'
      },
      {
        id: 'dgnl-q4',
        chapter: 'Xác suất & Tổ hợp',
        difficulty: 'Vận dụng',
        question: 'Chọn ngẫu nhiên 3 viên bi từ hộp có 5 đỏ và 4 xanh. Xác suất để chọn được ít nhất một viên bi đỏ bằng:',
        options: {
          A: '20/21',
          B: '1/21',
          C: '5/9',
          D: '19/21'
        },
        correctAnswer: 'A',
        explanation: 'Biến cố đối là chọn 3 viên xanh: $C_4^3 / C_9^3 = 4/84 = 1/21$. Vậy $P(A) = 1 - 1/21 = 20/21$.'
      },
      {
        id: 'dgnl-q5',
        chapter: 'Tư duy hình học không gian',
        difficulty: 'Thông hiểu',
        question: 'Một hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Diện tích toàn phần $S_{tp}$ bằng:',
        options: {
          A: '24\\pi cm^2',
          B: '15\\pi cm^2',
          C: '36\\pi cm^2',
          D: '12\\pi cm^2'
        },
        correctAnswer: 'A',
        explanation: '$l = \\sqrt{3^2 + 4^2} = 5$. $S_{tp} = \\pi r l + \\pi r^2 = 15\\pi + 9\\pi = 24\\pi\\text{ cm}^2$.'
      },
      {
        id: 'dgnl-q6',
        chapter: 'Giải quyết vấn đề',
        difficulty: 'Vận dụng cao',
        question: 'Mở vòi 1 và 2 thì sau 6h đầy bể. Mở vòi 2 và 3 sau 8h đầy bể. Mở vòi 1 và 3 sau 4h đầy bể. Mở cả 3 vòi sau bao lâu đầy bể?',
        options: {
          A: '3 giờ 41 phút 32 giây (32/9 giờ)',
          B: '3 giờ 30 phút',
          C: '4 giờ',
          D: '2 giờ 40 phút'
        },
        correctAnswer: 'A',
        explanation: '$2(x+y+z) = 1/6 + 1/8 + 1/4 = 13/24 \\implies x+y+z = 13/48$. Thời gian là $48/13$ giờ.'
      }
    ]
  }
];

export const INITIAL_UPLOADED_DOCS: UploadedExamDoc[] = [
  {
    id: 'up-doc-01',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2026 Môn Toán - Trường THPT Chuyên Lê Hồng Phong (Có Đáp Án & Ma Trận)',
    gradeTarget: '12',
    examType: 'Khảo sát chất lượng',
    year: '2026',
    schoolOrSource: 'THPT Chuyên Lê Hồng Phong - TP.HCM',
    description: 'Đề thi 50 câu trắc nghiệm chuẩn theo cấu trúc định dạng mới của Bộ Giáo dục & Đào tạo, phân hoá rõ rệt từ mức 7+ đến 9+.',
    fileName: 'De_Thi_Thu_Toan_Chuyen_Le_Hong_Phong_2026.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    fileDataUrl: 'https://cdn.example.com/mock-exam-le-hong-phong.pdf',
    hasAnswerKey: true,
    answerKeyFileName: 'Dap_An_Chi_Tiet_Chuyen_LHP_2026.pdf',
    answerKeyDataUrl: 'https://cdn.example.com/mock-exam-le-hong-phong-key.pdf',
    uploadedAt: '2026-10-24',
    author: 'Tổ Toán - THPT Chuyên'
  },
  {
    id: 'up-doc-02',
    title: 'Đề Thi Đánh Giá Năng Lực ĐHQG TP.HCM Mẫu 2026 - Phần Tư Duy Định Lượng (File Word Soạn Thảo)',
    gradeTarget: 'ĐGNL',
    examType: 'ĐGNL',
    year: '2026',
    schoolOrSource: 'Trung Tâm Trí Nhân biên soạn theo đề mẫu ĐHQG-HCM',
    description: 'Bản Word (.docx) chuẩn định dạng font chữ và công thức MathType/LaTeX để giáo viên dễ dàng biên tập và in ấn cho học sinh.',
    fileName: 'De_DGNL_DHQG_HCM_Tu_Duy_Dinh_Luong_2026.docx',
    fileSize: '640 KB',
    fileType: 'word',
    fileDataUrl: 'https://cdn.example.com/mock-dgnl-word-sample.docx',
    hasAnswerKey: true,
    answerKeyFileName: 'Huong_Dan_Giai_DGNL_2026.docx',
    uploadedAt: '2026-10-26',
    author: 'Thầy Cô Trung Tâm Trí Nhân'
  },
  {
    id: 'up-doc-03',
    title: 'Bộ Đề Kiểm Tra Giữa Học Kì 1 Toán 10 (3 Bộ Sách: Cánh Diều, Kết Nối Tri Thức, Chân Trời Sáng Tạo)',
    gradeTarget: '10',
    examType: 'Giữa HK1',
    year: '2025-2026',
    schoolOrSource: 'Tổng hợp từ các Sở GD&ĐT',
    description: 'Gồm 5 đề thi giữa kì chọn lọc có bảng ma trận đặc tả đề thi, đáp án và lời giải chi tiết cho học sinh lớp 10.',
    fileName: 'Bo_De_Giua_HK1_Toan_10_Moi.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    fileDataUrl: 'https://cdn.example.com/bo-de-giua-hk1-toan-10.pdf',
    hasAnswerKey: true,
    uploadedAt: '2026-10-22',
    author: 'Tổ Toán Khối 10'
  },
  {
    id: 'up-doc-04',
    title: 'Đề Kiểm Tra Cuối Học Kì 1 Toán 11 - Trường THPT Chuyên Sư Phạm Hà Nội (Bản PDF Chuẩn)',
    gradeTarget: '11',
    examType: 'Cuối HK1',
    year: '2025-2026',
    schoolOrSource: 'THPT Chuyên Đại Học Sư Phạm Hà Nội',
    description: 'Nội dung gồm Lượng giác, Cấp số cộng - Cấp số nhân, Giới hạn và Quan hệ song song trong không gian.',
    fileName: 'De_Cuoi_HK1_Toan_11_Chuyen_Su_Pham.pdf',
    fileSize: '1.2 MB',
    fileType: 'pdf',
    fileDataUrl: 'https://cdn.example.com/de-cuoi-hk1-toan-11-csp.pdf',
    hasAnswerKey: true,
    uploadedAt: '2026-10-20',
    author: 'Thầy Cô Chuyên Sư Phạm'
  }
];
