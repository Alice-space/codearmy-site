export type Locale = "en" | "zh";

type Action = {
  label: string;
  href: string;
};

type Metric = {
  value: string;
  label: string;
  detail: string;
};

type Layer = {
  tag: string;
  title: string;
  body: string;
};

type FlowNode = {
  step: string;
  title: string;
  body: string;
  artifact: string;
};

type Feature = {
  title: string;
  body: string;
};

type Surface = {
  title: string;
  body: string;
};

type CaseStudy = {
  title: string;
  status: string;
  summary: string;
  bullets: string[];
};

type RoadmapItem = {
  stage: string;
  title: string;
  body: string;
};

type QuickstartStep = {
  step: string;
  title: string;
  body: string;
  command: string;
};

type Link = {
  label: string;
  href: string;
};

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  navItems: Array<{
    id: string;
    label: string;
  }>;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    actions: Action[];
    badges: string[];
    metrics: Metric[];
    terminalLabel: string;
    terminalLines: string[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    body: string;
    layers: Layer[];
    repoPanelTitle: string;
    repoPanelBody: string;
    repoBullets: string[];
  };
  flow: {
    eyebrow: string;
    title: string;
    body: string;
    nodes: FlowNode[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    body: string;
    features: Feature[];
    surfacesTitle: string;
    surfaces: Surface[];
    artifactTitle: string;
    artifactIntro: string;
    artifactLines: string[];
  };
  cases: {
    eyebrow: string;
    title: string;
    body: string;
    items: CaseStudy[];
  };
  roadmap: {
    eyebrow: string;
    title: string;
    body: string;
    items: RoadmapItem[];
  };
  quickstart: {
    eyebrow: string;
    title: string;
    body: string;
    steps: QuickstartStep[];
    links: Link[];
    callout: string;
  };
  closing: {
    title: string;
    body: string;
    primary: Action;
    secondary: Action;
  };
  footer: {
    note: string;
  };
}

export const siteContent: Record<Locale, SiteContent> = {
  en: {
    meta: {
      title: "Repo-first orchestration for long-horizon AI coding",
      description:
        "CodeArmy turns planning, execution, review, reconcile, and reporting into a repo-native campaign workflow for serious AI coding and research."
    },
    navItems: [
      { id: "overview", label: "Overview" },
      { id: "architecture", label: "Architecture" },
      { id: "flow", label: "Workflow" },
      { id: "capabilities", label: "Capabilities" },
      { id: "cases", label: "Cases" },
      { id: "roadmap", label: "Roadmap" },
      { id: "quickstart", label: "Quickstart" }
    ],
    hero: {
      eyebrow: "Open-source infrastructure for long-horizon coding",
      title: "CodeArmy turns multi-agent work into a repo-native campaign.",
      body:
        "Instead of hiding state in chat logs, CodeArmy writes plans, task packages, reviews, wake-ups, and live reports back to durable repo artifacts. Humans keep the final gate. Agents keep the execution moving.",
      actions: [
        { label: "Inspect the workflow", href: "#flow" },
        { label: "Open Alice Runtime", href: "https://github.com/Alice-space/alice" }
      ],
      badges: ["Repo-first truth", "Human-gated", "Worktree-safe", "Open-source"],
      metrics: [
        {
          value: "5",
          label: "Core layers",
          detail: "skill script, runtime index, campaign repo, reconcile/dispatch, source repos"
        },
        {
          value: "4",
          label: "Working roles",
          detail: "planner, planner reviewer, executor, reviewer"
        },
        {
          value: "1",
          label: "Planning truth",
          detail: "the campaign repo remains the durable source of coordination state"
        },
        {
          value: "Multi",
          label: "Execution surfaces",
          detail: "CLI, runtime API, scheduler, worktrees, cluster jobs, repository reviews"
        }
      ],
      terminalLabel: "Repo reconcile snapshot",
      terminalLines: [
        "$ alice-code-army repo-reconcile",
        "truth: campaign repo",
        "dispatch: planner -> reviewer -> executor",
        "writeback: task.md / reviews / live-report.md",
        "surfaces: local repos + runtime tasks + cluster jobs"
      ]
    },
    architecture: {
      eyebrow: "System model",
      title: "Built around clean state boundaries, not a bigger chat window.",
      body:
        "CodeArmy is useful when work spans many rounds, many repos, or many execution environments. Each layer has a narrow responsibility, which is why the system stays inspectable.",
      layers: [
        {
          tag: "01",
          title: "Skill entry",
          body: "The user-facing script exposes create, bootstrap, scan, reconcile, approval, and execution commands."
        },
        {
          tag: "02",
          title: "Runtime campaign index",
          body: "Alice runtime keeps a light session-level index, summaries, and routing state for active campaigns."
        },
        {
          tag: "03",
          title: "Campaign repo truth",
          body: "Long-lived plans, tasks, reviews, reports, and phase status live in repo-native markdown."
        },
        {
          tag: "04",
          title: "Reconcile and dispatch",
          body: "The runtime reads repo truth, derives ready or blocked work, and materializes the next planner, executor, reviewer, or wake task."
        },
        {
          tag: "05",
          title: "Source repos and jobs",
          body: "Actual code changes happen in source repositories, worktrees, and compute jobs instead of inside the campaign repo."
        }
      ],
      repoPanelTitle: "Why repo-first matters",
      repoPanelBody:
        "The campaign repo is the audit trail. It is where a new agent can restart, where a reviewer can validate, and where a human can inspect the exact state of the campaign without replaying a week of chat.",
      repoBullets: [
        "Planning truth survives model changes, runtime restarts, and handoffs.",
        "Task packages can carry explicit write scope, acceptance rules, and review rounds.",
        "Live reports summarize the queue without replacing the underlying evidence.",
        "Old archive repos stay as reference evidence instead of silently mutating current truth."
      ]
    },
    flow: {
      eyebrow: "Flow chart",
      title: "The operating loop is repo truth -> reconcile -> dispatch -> writeback.",
      body:
        "Every transition leaves artifacts behind. That makes the next decision explainable and makes long-running work recoverable after interruptions.",
      nodes: [
        {
          step: "01",
          title: "Define objective",
          body: "Create the campaign, register source repos, constraints, and the initial planning boundary.",
          artifact: "campaign.md"
        },
        {
          step: "02",
          title: "Plan in repo",
          body: "Planner writes proposals, phased tasks, and explicit acceptance contracts instead of vague to-do text.",
          artifact: "plans/ and phases/"
        },
        {
          step: "03",
          title: "Review before execution",
          body: "Planner reviewer and human approval gate determine whether the plan is allowed to move forward.",
          artifact: "plan reviews"
        },
        {
          step: "04",
          title: "Dispatch bounded execution",
          body: "Executors get isolated worktrees, write scope, branch ownership, and task-local result paths.",
          artifact: "task.md + results/"
        },
        {
          step: "05",
          title: "Review and reconcile",
          body: "Review verdicts, blocked dependencies, and repository issues are written back before the next wave starts.",
          artifact: "reviews/ + live report"
        },
        {
          step: "06",
          title: "Report and wake",
          body: "Long jobs, waiting tasks, and campaign-wide summaries remain visible even when the active operator changes.",
          artifact: "wake fields + reports/"
        }
      ]
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "The product is not one feature. It is a coordination contract.",
      body:
        "CodeArmy is designed for codebases where planning, execution, and validation happen on different clocks. These are the capabilities that matter in practice.",
      features: [
        {
          title: "Repo-native task packages",
          body: "Tasks carry write scope, dependencies, review state, execution rounds, commit anchors, and result paths."
        },
        {
          title: "Deterministic reconcile",
          body: "Ready, blocked, waiting, and review-pending work is derived from repo truth instead of operator memory."
        },
        {
          title: "Human approval gates",
          body: "Humans can require plan approval, acceptance gates, or explicit reopen policy before another execution wave begins."
        },
        {
          title: "Isolated execution surfaces",
          body: "Source repos, worktrees, task branches, and cluster jobs remain isolated and attributable."
        },
        {
          title: "Live report generation",
          body: "A campaign-level report summarizes active tasks, blockers, repository issues, and next actions without hiding the evidence."
        },
        {
          title: "Wake and long-job support",
          body: "Wake timestamps and prompts let the system resume long HPC, training, or review workflows after bounded waiting."
        }
      ],
      surfacesTitle: "Where it operates",
      surfaces: [
        {
          title: "CLI and shell entry",
          body: "For bootstrap, reconcile, approval, and operator-grade debugging."
        },
        {
          title: "Alice runtime API",
          body: "For campaign indexing, dispatch bookkeeping, and automated reconcile loops."
        },
        {
          title: "Source repositories",
          body: "For real code changes, isolated worktrees, task branches, and reviewable commits."
        },
        {
          title: "Scheduler and cluster jobs",
          body: "For long-running experiments, wake-based continuation, and evidence collection across compute surfaces."
        }
      ],
      artifactTitle: "Campaign repo artifact contract",
      artifactIntro:
        "This is the shape that makes the workflow durable. It is intentionally plain text, reviewable, and easy to diff.",
      artifactLines: [
        "campaign.md",
        "plans/proposals/",
        "plans/merged/master-plan.md",
        "phases/Pxx/tasks/Txxx/task.md",
        "phases/Pxx/tasks/Txxx/reviews/R001.md",
        "reports/live-report.md"
      ]
    },
    cases: {
      eyebrow: "Real campaign patterns",
      title: "CodeArmy is already used on work that is too messy for ordinary ticket boards.",
      body:
        "These are not invented marketing examples. They reflect current campaign types already present in the working environment around Alice and CodeArmy.",
      items: [
        {
          title: "CodeArmy Product Front Door",
          status: "Product and site delivery",
          summary:
            "The website itself is managed as a campaign so design changes, bilingual fixes, review verdicts, and release-quality content rewrite are all tied back to task artifacts.",
          bullets: [
            "Planning and implementation are separated into explicit task packages instead of ad hoc edits.",
            "Review records capture why a routing or language change was rejected or accepted.",
            "The campaign can close with a live report that shows the work queue is actually finished."
          ]
        },
        {
          title: "FastEcalSim rCM Regression Recovery",
          status: "HPC research recovery",
          summary:
            "Training recovery work needs local code changes, bounded smoke tests, Slurm jobs, checkpoint evaluation, and hard quality gates. CodeArmy keeps those stages connected.",
          bullets: [
            "Task packages point to worktrees, scripts, checkpoints, and expected gates.",
            "Blocked state is explicit when external evaluation evidence is still missing.",
            "Handover notes stay linked to the same campaign rather than drifting into separate chat threads."
          ]
        },
        {
          title: "JUNOSW Ge68 Baseline Rebuild",
          status: "Multi-repo scientific tuning",
          summary:
            "A rebuild campaign coordinates documentation repos, code repos, inherited archive evidence, and new execution tasks while enforcing phase-level gates.",
          bullets: [
            "Old archive material remains reference evidence instead of silently becoming active planning truth.",
            "Repository issues and dependency blockers are surfaced automatically by reconcile.",
            "Ready tasks, blocked tasks, and next actions stay visible without hand-maintained spreadsheets."
          ]
        }
      ]
    },
    roadmap: {
      eyebrow: "Roadmap",
      title: "Ship the hard coordination core first, then widen the surface.",
      body:
        "The current direction is deliberately technical. CodeArmy needs to be credible as an open-source orchestration layer before it tries to look broad or polished.",
      items: [
        {
          stage: "Now",
          title: "Sharper product front door",
          body: "Explain the real system layers, real workflow, and real campaign cases in one page that matches the implementation."
        },
        {
          stage: "Next",
          title: "More reusable campaign templates",
          body: "Reduce setup friction for multi-repo delivery, research campaigns, and long-running compute workflows."
        },
        {
          stage: "Later",
          title: "Wider integrations without losing repo truth",
          body: "Expose more collaboration surfaces while keeping campaign repo artifacts as the durable planning source."
        }
      ]
    },
    quickstart: {
      eyebrow: "Quickstart",
      title: "The shortest path is still repo-first.",
      body:
        "If you want to understand CodeArmy quickly, start from the campaign repo and follow the reconcile loop. These are the high-signal entry commands.",
      steps: [
        {
          step: "01",
          title: "Create or bootstrap a campaign",
          body: "Start from a real objective and a source repo list. The campaign repo becomes the long-lived coordination surface.",
          command: "alice-code-army create\nalice-code-army bootstrap"
        },
        {
          step: "02",
          title: "Scan the repos you actually need",
          body: "Register source repos, branches, and boundaries before you ask agents to act.",
          command: "alice-code-army repo-scan"
        },
        {
          step: "03",
          title: "Run reconcile and inspect the generated truth",
          body: "Let the system derive plan state, ready work, blocked work, and dispatch candidates from the repo.",
          command: "alice-code-army repo-reconcile"
        },
        {
          step: "04",
          title: "Approve, execute, review, repeat",
          body: "Humans approve the plan when needed; executors and reviewers then write their evidence back into the same campaign.",
          command: "alice-code-army approve-plan"
        }
      ],
      links: [
        { label: "Alice Runtime Repository", href: "https://github.com/Alice-space/alice" },
        { label: "CodeArmy Site Repository", href: "https://github.com/Alice-space/codearmy-site" }
      ],
      callout:
        "If you are debugging the system itself, inspect the runtime repo and the campaign repo together. One shows coordination mechanics. The other shows the durable truth."
    },
    closing: {
      title: "Open-source orchestration should look inspectable, not magical.",
      body:
        "CodeArmy is strongest when it makes long-running work legible: explicit plans, bounded execution, auditable reviews, and recoverable state across repos and compute surfaces.",
      primary: { label: "Read the quickstart", href: "#quickstart" },
      secondary: { label: "Browse the runtime code", href: "https://github.com/Alice-space/alice" }
    },
    footer: {
      note:
        "Repo-first campaign orchestration for long-horizon coding, research, review, and reporting."
    }
  },
  zh: {
    meta: {
      title: "面向长周期 AI 编码的 repo-first 编排层",
      description:
        "CodeArmy 把规划、执行、审阅、reconcile 和报告写回仓库事实源，适合真正长期、多仓库、多执行面的 AI 编码与科研协作。"
    },
    navItems: [
      { id: "overview", label: "总览" },
      { id: "architecture", label: "架构" },
      { id: "flow", label: "流程图" },
      { id: "capabilities", label: "能力" },
      { id: "cases", label: "案例" },
      { id: "roadmap", label: "路线图" },
      { id: "quickstart", label: "快速入门" }
    ],
    hero: {
      eyebrow: "面向长周期编码的开源基础设施",
      title: "CodeArmy 把多 Agent 协作变成 repo-native campaign。",
      body:
        "它不会把状态藏在聊天记录里，而是把计划、任务包、审阅、唤醒信息和 live report 写回仓库事实源。人负责最终门控，Agent 负责持续推进。",
      actions: [
        { label: "查看流程图", href: "#flow" },
        { label: "打开 Alice Runtime", href: "https://github.com/Alice-space/alice" }
      ],
      badges: ["Repo-first 真相源", "人工门控", "Worktree 隔离", "开源可审计"],
      metrics: [
        {
          value: "5",
          label: "核心层次",
          detail: "skill 脚本、runtime 索引、campaign repo、reconcile/dispatch、source repos"
        },
        {
          value: "4",
          label: "工作角色",
          detail: "planner、planner reviewer、executor、reviewer"
        },
        {
          value: "1",
          label: "规划真相源",
          detail: "长期协作状态统一落在 campaign repo 中"
        },
        {
          value: "多面",
          label: "执行入口",
          detail: "CLI、runtime API、调度器、worktree、集群作业、仓库审阅"
        }
      ],
      terminalLabel: "Repo reconcile 快照",
      terminalLines: [
        "$ alice-code-army repo-reconcile",
        "truth: campaign repo",
        "dispatch: planner -> reviewer -> executor",
        "writeback: task.md / reviews / live-report.md",
        "surfaces: 本地仓库 + runtime task + cluster jobs"
      ]
    },
    architecture: {
      eyebrow: "系统结构",
      title: "不是更大的聊天窗口，而是更干净的状态边界。",
      body:
        "当工作跨越很多轮、很多仓库、很多执行环境时，CodeArmy 才真正有价值。每一层职责都很窄，所以系统才能可读、可查、可恢复。",
      layers: [
        {
          tag: "01",
          title: "Skill 入口",
          body: "面对用户的脚本暴露 create、bootstrap、scan、reconcile、approve、execute 等命令。"
        },
        {
          tag: "02",
          title: "Runtime campaign 索引",
          body: "Alice runtime 只保存会话级索引、摘要和当前 campaign 的轻量路由状态。"
        },
        {
          tag: "03",
          title: "Campaign repo 真相源",
          body: "长期计划、任务、审阅、阶段状态和报告都落在 repo-native markdown 中。"
        },
        {
          tag: "04",
          title: "Reconcile 与 dispatch",
          body: "Runtime 读取 repo 真相源，推导 ready、blocked、review-pending，并派发下一轮 planner、executor、reviewer 或 wake task。"
        },
        {
          tag: "05",
          title: "Source repos 与作业",
          body: "真正的业务代码修改发生在源仓库、worktree 和计算作业里，而不是写进 campaign repo。"
        }
      ],
      repoPanelTitle: "为什么必须 repo-first",
      repoPanelBody:
        "Campaign repo 就是审计轨迹。新 agent 重启要看它，reviewer 验证要看它，人类判断真实状态也要看它，而不是回放一整周聊天记录。",
      repoBullets: [
        "规划真相源不受模型切换、runtime 重启和人员交接影响。",
        "任务包可以显式携带 write scope、验收规则和 review round。",
        "Live report 只做摘要，不替代底层证据。",
        "旧 archive repo 只能作为 reference evidence，不能偷偷污染当前主线真相源。"
      ]
    },
    flow: {
      eyebrow: "流程图",
      title: "核心循环是 repo truth -> reconcile -> dispatch -> writeback。",
      body:
        "每次状态跃迁都会留下 artifact，所以中断之后能恢复，下一步决策也能解释得清楚。",
      nodes: [
        {
          step: "01",
          title: "定义目标",
          body: "创建 campaign，登记 source repos、约束和本轮 planning 的边界。",
          artifact: "campaign.md"
        },
        {
          step: "02",
          title: "在 repo 里规划",
          body: "Planner 写 proposal、phase、task 和 acceptance contract，而不是只留下模糊待办。",
          artifact: "plans/ 与 phases/"
        },
        {
          step: "03",
          title: "执行前先审",
          body: "Planner reviewer 和人工批准门控决定计划是否允许进入下一轮执行。",
          artifact: "plan reviews"
        },
        {
          step: "04",
          title: "派发有边界的执行",
          body: "Executor 拿到隔离 worktree、write scope、分支归属和 task-local 结果路径。",
          artifact: "task.md + results/"
        },
        {
          step: "05",
          title: "审阅并回填",
          body: "Reviewer verdict、依赖阻塞和 repository issues 会先写回 repo，再决定下一波动作。",
          artifact: "reviews/ + live report"
        },
        {
          step: "06",
          title: "报告与唤醒",
          body: "长作业、等待任务和全局摘要在切换操作人之后仍然保持可见。",
          artifact: "wake 字段 + reports/"
        }
      ]
    },
    capabilities: {
      eyebrow: "能力说明",
      title: "它不是单一功能，而是一份协作合同。",
      body:
        "CodeArmy 面向的是规划、执行和验证节奏并不同步的代码库。真正重要的是下面这些能力，而不是表面的聊天体验。",
      features: [
        {
          title: "Repo-native 任务包",
          body: "任务携带 write scope、依赖、审阅状态、执行轮次、commit 锚点和结果路径。"
        },
        {
          title: "确定性的 reconcile",
          body: "Ready、blocked、waiting、review-pending 全部从 repo 真相源推导，而不是靠操作人记忆。"
        },
        {
          title: "人工批准门控",
          body: "人可以在 plan approval、phase gate、acceptance gate、reopen policy 上保留最终裁决权。"
        },
        {
          title: "隔离执行面",
          body: "Source repo、worktree、task branch 和集群作业都保持隔离、可归因、可复查。"
        },
        {
          title: "Live report 自动生成",
          body: "Campaign 级报告会汇总 active task、blocker、repository issue 和 next action，但不会吞掉底层证据。"
        },
        {
          title: "Wake 与长任务支持",
          body: "通过 wake 时间和 wake prompt，可以把 HPC、训练、外部评估等长作业安全接回下一轮。"
        }
      ],
      surfacesTitle: "它在哪些面上工作",
      surfaces: [
        {
          title: "CLI 与 shell 入口",
          body: "用于 bootstrap、reconcile、approve 和操作员级排障。"
        },
        {
          title: "Alice runtime API",
          body: "用于 campaign 索引、dispatch 记账和自动 reconcile 循环。"
        },
        {
          title: "Source repositories",
          body: "用于真实代码修改、隔离 worktree、task branch 和可审阅 commit。"
        },
        {
          title: "调度器与集群作业",
          body: "用于长时间实验、wake 恢复以及跨计算面收集证据。"
        }
      ],
      artifactTitle: "Campaign repo 的 artifact 合同",
      artifactIntro:
        "这套目录形状就是工作流可恢复的原因。它是纯文本、可 diff、可审阅，也方便新 agent 快速接手。",
      artifactLines: [
        "campaign.md",
        "plans/proposals/",
        "plans/merged/master-plan.md",
        "phases/Pxx/tasks/Txxx/task.md",
        "phases/Pxx/tasks/Txxx/reviews/R001.md",
        "reports/live-report.md"
      ]
    },
    cases: {
      eyebrow: "真实案例",
      title: "CodeArmy 已经在普通任务板很难驾驭的工作上使用。",
      body:
        "下面这些不是虚构营销案例，而是 Alice / CodeArmy 当前工作环境里已经存在的典型 campaign 形态。",
      items: [
        {
          title: "CodeArmy Product Front Door",
          status: "产品与站点交付",
          summary:
            "连网站本身都按 campaign 管理，所以设计调整、双语修复、审阅结论和发布级内容改写都能追溯到任务产物。",
          bullets: [
            "规划和实现通过显式 task package 分开，而不是一边聊一边改。",
            "审阅记录会说明路由和语言改动为什么被打回或通过。",
            "Campaign 收口时可以直接用 live report 证明队列确实结束。"
          ]
        },
        {
          title: "FastEcalSim rCM Regression Recovery",
          status: "HPC 科研恢复",
          summary:
            "训练恢复要同时处理本地代码、bounded smoke test、Slurm 作业、checkpoint 评估和硬门槛，CodeArmy 用同一条证据链把它们串起来。",
          bullets: [
            "任务包会指向 worktree、脚本、checkpoint 和目标 gate。",
            "外部评估证据没回来时，blocked 状态会被显式标注。",
            "交接说明仍然挂在同一 campaign 下，不会漂到新的聊天线程里。"
          ]
        },
        {
          title: "JUNOSW Ge68 Baseline Rebuild",
          status: "多仓库科学调优",
          summary:
            "一个重建 campaign 同时协调文档仓库、代码仓库、历史 archive 证据和新执行任务，并且严格执行 phase-level gate。",
          bullets: [
            "旧 archive 只保留为 reference evidence，不会偷偷变成当前规划真相源。",
            "Repository issues 和依赖阻塞由 reconcile 自动暴露。",
            "Ready task、blocked task 和 next action 不需要手工维护表格。"
          ]
        }
      ]
    },
    roadmap: {
      eyebrow: "路线图",
      title: "先把协作内核做硬，再把表面做宽。",
      body:
        "当前方向是刻意偏技术的。CodeArmy 必须先作为开源 orchestration layer 讲清楚、站得住，再去扩展更宽的产品表面。",
      items: [
        {
          stage: "当前",
          title: "把产品前门讲清楚",
          body: "用一页把真实层次、真实工作流和真实案例说清楚，保证站点叙事和实现一致。"
        },
        {
          stage: "下一步",
          title: "沉淀更多可复用模板",
          body: "继续降低多仓库交付、科研 campaign 和长任务协作的初始化成本。"
        },
        {
          stage: "之后",
          title: "扩展更多接入面但不丢真相源",
          body: "增加协作入口，但始终保持 campaign repo 作为长期规划和审阅的主事实源。"
        }
      ]
    },
    quickstart: {
      eyebrow: "快速入门",
      title: "最短路径仍然是 repo-first。",
      body:
        "如果你想最快理解 CodeArmy，就从 campaign repo 出发，再跟着 reconcile 循环往下看。下面是最值得记住的入口命令。",
      steps: [
        {
          step: "01",
          title: "创建或初始化 campaign",
          body: "从真实 objective 和 source repo 列表开始，把 campaign repo 立成长期协作面。",
          command: "alice-code-army create\nalice-code-army bootstrap"
        },
        {
          step: "02",
          title: "扫描真正要操作的仓库",
          body: "先把 source repo、分支和边界登记清楚，再让 agent 开始动手。",
          command: "alice-code-army repo-scan"
        },
        {
          step: "03",
          title: "执行 reconcile 并检查 repo 真相源",
          body: "让系统从 repo 中推导出 plan 状态、ready work、blocked work 和 dispatch 候选。",
          command: "alice-code-army repo-reconcile"
        },
        {
          step: "04",
          title: "批准、执行、审阅、再循环",
          body: "需要时由人批准计划，随后 executor 和 reviewer 把证据写回同一 campaign。",
          command: "alice-code-army approve-plan"
        }
      ],
      links: [
        { label: "Alice Runtime 仓库", href: "https://github.com/Alice-space/alice" },
        { label: "CodeArmy Site 仓库", href: "https://github.com/Alice-space/codearmy-site" }
      ],
      callout:
        "如果你是在排查系统自身行为，就要同时看 runtime repo 和 campaign repo。前者解释协调机制，后者保存长期真相源。"
    },
    closing: {
      title: "好的开源 orchestration，不该显得神秘，而该显得可审计。",
      body:
        "CodeArmy 的强项在于把长周期工作变得可读：计划明确、执行有边界、审阅可追溯、状态可恢复，而且能跨仓库和计算面持续推进。",
      primary: { label: "查看快速入门", href: "#quickstart" },
      secondary: { label: "浏览运行时代码", href: "https://github.com/Alice-space/alice" }
    },
    footer: {
      note: "面向长周期编码、科研、审阅和报告的 repo-first campaign orchestration。"
    }
  }
};
