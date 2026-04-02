export type Locale = "en" | "zh";

type Action = {
  label: string;
  href: string;
};

type Signal = {
  title: string;
  body: string;
};

type Problem = {
  title: string;
  body: string;
};

type Feature = {
  title: string;
  body: string;
};

type FlowNode = {
  step: string;
  title: string;
  body: string;
  artifact: string;
};

type CaseStudy = {
  title: string;
  summary: string;
  bullets: string[];
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
    examples: string[];
    terminalLabel: string;
    terminalLines: string[];
    signals: Signal[];
  };
  why: {
    eyebrow: string;
    title: string;
    body: string;
    problems: Problem[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    body: string;
    features: Feature[];
  };
  flow: {
    eyebrow: string;
    title: string;
    body: string;
    nodes: FlowNode[];
  };
  cases: {
    eyebrow: string;
    title: string;
    body: string;
    items: CaseStudy[];
  };
  repo: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    treeTitle: string;
    treeIntro: string;
    treeLines: string[];
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
      title: "Manage long-running AI coding and research in repo",
      description:
        "CodeArmy manages long-running AI coding and research campaigns with repo-native plans, task status, review writeback, and live reporting."
    },
    navItems: [
      { id: "overview", label: "Overview" },
      { id: "why", label: "Why" },
      { id: "capabilities", label: "What It Does" },
      { id: "flow", label: "Workflow" },
      { id: "cases", label: "Cases" },
      { id: "repo", label: "Repo-First" },
      { id: "quickstart", label: "Quickstart" }
    ],
    hero: {
      eyebrow: "For work that lasts longer than one chat",
      title: "CodeArmy manages long-running AI coding and research campaigns.",
      body:
        "Use it when one task spans several repos, several review rounds, or several days of experiments. CodeArmy keeps the plan, task status, review results, and next action in repo so the work can stop, resume, and stay understandable.",
      actions: [
        { label: "See the workflow", href: "#flow" },
        { label: "Read the cases", href: "#cases" }
      ],
      examples: [
        "Ship one feature across multiple repos with explicit review gates.",
        "Run a research iteration that includes local edits, cluster jobs, and later wake-ups.",
        "Hand work from planner to executor to reviewer without re-explaining the whole project.",
        "See at a glance what is ready, blocked, waiting, or done."
      ],
      terminalLabel: "Typical control loop",
      terminalLines: [
        "$ alice-code-army repo-reconcile",
        "read campaign repo truth",
        "decide ready / blocked / waiting work",
        "dispatch the next bounded task",
        "write results and reviews back to repo"
      ],
      signals: [
        {
          title: "Multi-repo delivery",
          body: "Keep one objective coherent even when the code change spans several repositories."
        },
        {
          title: "Long-running experiments",
          body: "Track work that mixes local edits, remote jobs, waiting time, and later continuation."
        },
        {
          title: "Human review gates",
          body: "Hold plan approval, review verdicts, and reopen decisions in visible repo artifacts."
        },
        {
          title: "Repo-native reporting",
          body: "Generate live reports from the same task packages and review evidence that drive execution."
        }
      ]
    },
    why: {
      eyebrow: "Why CodeArmy",
      title: "Because chat history is not a durable project system.",
      body:
        "When the work is short, chat is enough. When the work stretches across repos, people, and compute surfaces, the state starts to leak. CodeArmy exists to keep that state visible.",
      problems: [
        {
          title: "Plans vanish into conversation",
          body: "After enough turns, the real task boundary, acceptance rules, and next action become hard to recover."
        },
        {
          title: "Long jobs outlive the operator",
          body: "Cluster runs, waiting tasks, and delayed checks keep going while the human context goes stale."
        },
        {
          title: "Review and rerun evidence scatters",
          body: "Commits, reviewer verdicts, logs, and follow-up actions end up split across tools and threads."
        },
        {
          title: "Multi-repo work loses boundaries",
          body: "Without explicit scope, it becomes unclear which repo changes belong together and what is blocked."
        }
      ]
    },
    capabilities: {
      eyebrow: "What CodeArmy Does",
      title: "It gives long-running work a coordination contract.",
      body:
        "The point is not to sound clever. The point is to make the next action obvious, the current state inspectable, and the evidence easy to review.",
      features: [
        {
          title: "Turn one objective into reviewable task packages",
          body: "Plans become phased tasks with dependencies, write scope, and acceptance rules instead of a loose to-do list."
        },
        {
          title: "Tell you what is ready, blocked, waiting, or done",
          body: "Reconcile reads repo truth and derives the queue instead of relying on operator memory."
        },
        {
          title: "Keep humans in the approval loop",
          body: "Plan approval, review verdicts, and reopen policy stay explicit rather than implied."
        },
        {
          title: "Run work in isolated execution surfaces",
          body: "Source repos, worktrees, branches, and remote jobs stay bounded and attributable."
        },
        {
          title: "Wake long tasks and continue later",
          body: "Waiting on training, evaluation, or external evidence no longer means losing the thread."
        },
        {
          title: "Write status and reports back to repo",
          body: "The same artifacts that drive execution also support live reports and final summaries."
        }
      ]
    },
    flow: {
      eyebrow: "Workflow",
      title: "The loop is simple: define, plan, execute, review, reconcile.",
      body:
        "This is the user-facing flow. Each step produces an artifact so the next person or agent can continue without guessing.",
      nodes: [
        {
          step: "01",
          title: "Define the objective",
          body: "Start with a real goal, source repos, and boundaries for this round of work.",
          artifact: "campaign.md"
        },
        {
          step: "02",
          title: "Plan and approve",
          body: "Turn the goal into phases and task packages, then hold plan approval before execution.",
          artifact: "plans/ + task packages"
        },
        {
          step: "03",
          title: "Execute in bounded scope",
          body: "Run the task in isolated repos, branches, worktrees, or jobs with clear ownership.",
          artifact: "results/ + commit anchors"
        },
        {
          step: "04",
          title: "Review and write back",
          body: "Reviewer verdicts, concerns, and follow-up actions are written back where the task lives.",
          artifact: "reviews/"
        },
        {
          step: "05",
          title: "Reconcile and continue",
          body: "Refresh the campaign state, surface blockers, and decide the next wave of work.",
          artifact: "live-report.md"
        }
      ]
    },
    cases: {
      eyebrow: "Real Cases",
      title: "This is for work that is already messy in real life.",
      body:
        "The examples below reflect real campaign patterns around Alice and CodeArmy rather than generic marketing placeholders.",
      items: [
        {
          title: "CodeArmy Site Rewrite",
          summary:
            "Use one campaign to manage positioning, bilingual fixes, content review, and the release of the site itself.",
          bullets: [
            "Content changes and UI fixes are split into explicit tasks instead of chat-driven editing.",
            "Review verdicts explain why a change was accepted or sent back.",
            "The campaign can close with a live report that matches the actual repo state."
          ]
        },
        {
          title: "FastEcalSim Recovery Work",
          summary:
            "Coordinate local code changes, smoke tests, cluster runs, checkpoint checks, and follow-up wake-ups in one traceable loop.",
          bullets: [
            "Task packages point to worktrees, scripts, checkpoints, and quality gates.",
            "Blocked state stays explicit when external evaluation evidence is still missing.",
            "Handover notes remain attached to the same campaign instead of drifting into new threads."
          ]
        },
        {
          title: "JUNOSW Multi-Repo Tuning",
          summary:
            "Keep documentation repos, code repos, inherited evidence, and phase gates aligned in a single planning surface.",
          bullets: [
            "Old archive material stays reference-only instead of silently becoming active truth.",
            "Repository issues and dependency blockers are surfaced by reconcile.",
            "The next action stays visible without spreadsheets or manual status boards."
          ]
        }
      ]
    },
    repo: {
      eyebrow: "Why Repo-First",
      title: "CodeArmy is repo-first because the repo is where recovery happens.",
      body:
        "The chat helps people and agents move. The repo records what actually happened. If the system must survive interruptions, handoffs, and review, the durable state cannot live only in conversation.",
      points: [
        "A new agent can restart from repo artifacts without replaying a week of chat.",
        "Review happens against the same task package that guided execution.",
        "Reports summarize repo truth rather than replacing it.",
        "Humans can inspect the exact current state before approving the next step."
      ],
      treeTitle: "What lives in the campaign repo",
      treeIntro:
        "The structure is intentionally plain text and diff-friendly. It is built for inspection, review, and restart.",
      treeLines: [
        "campaign.md",
        "plans/proposals/",
        "plans/merged/master-plan.md",
        "phases/Pxx/tasks/Txxx/task.md",
        "phases/Pxx/tasks/Txxx/reviews/R001.md",
        "reports/live-report.md"
      ]
    },
    quickstart: {
      eyebrow: "Quickstart",
      title: "The shortest path is still repo-first.",
      body:
        "If you want to understand CodeArmy quickly, start from a campaign repo and run the control loop once.",
      steps: [
        {
          step: "01",
          title: "Create the campaign shell",
          body: "Start from a real objective and the repos you want to coordinate.",
          command: "alice-code-army create\nalice-code-army bootstrap"
        },
        {
          step: "02",
          title: "Scan the repos and boundaries",
          body: "Make the source repos and execution surface explicit before you dispatch work.",
          command: "alice-code-army repo-scan"
        },
        {
          step: "03",
          title: "Run reconcile",
          body: "Let the system derive plan state, ready tasks, blocked tasks, and next actions from repo truth.",
          command: "alice-code-army repo-reconcile"
        },
        {
          step: "04",
          title: "Approve, execute, review",
          body: "Keep the human gate explicit, then write execution and review evidence back to the same campaign.",
          command: "alice-code-army approve-plan"
        }
      ],
      links: [
        { label: "Alice Runtime Repository", href: "https://github.com/Alice-space/alice" },
        { label: "CodeArmy Site Repository", href: "https://github.com/Alice-space/codearmy-site" }
      ],
      callout:
        "If you are debugging the system itself, read the runtime repo and the campaign repo together: one shows control flow, the other holds the durable state."
    },
    closing: {
      title: "Open-source orchestration should feel inspectable, not mystical.",
      body:
        "CodeArmy is strongest when it makes long-running work legible: clear plans, bounded execution, auditable review, and state you can recover after a pause.",
      primary: { label: "Start from the workflow", href: "#flow" },
      secondary: { label: "Browse the runtime code", href: "https://github.com/Alice-space/alice" }
    },
    footer: {
      note: "Repo-first coordination for long-running coding, research, review, and reporting."
    }
  },
  zh: {
    meta: {
      title: "把长周期 AI 编码和科研协作管起来",
      description:
        "CodeArmy 用仓库内的计划、任务状态、审阅回填和 live report，管理长周期的 AI 编码与科研 campaign。"
    },
    navItems: [
      { id: "overview", label: "总览" },
      { id: "why", label: "为什么" },
      { id: "capabilities", label: "能做什么" },
      { id: "flow", label: "流程" },
      { id: "cases", label: "案例" },
      { id: "repo", label: "仓库优先" },
      { id: "quickstart", label: "快速入门" }
    ],
    hero: {
      eyebrow: "给那些不会在一轮聊天里结束的工作",
      title: "CodeArmy 用来管理长周期的 AI 编码和科研协作。",
      body:
        "当一个任务会跨多个仓库、多个 review 回合，或者几天的实验执行时，它就比普通聊天和任务板更合适。CodeArmy 把计划、任务状态、review 结论和下一步动作写回仓库，所以工作中断之后还能接着做。",
      actions: [
        { label: "先看流程", href: "#flow" },
        { label: "再看案例", href: "#cases" }
      ],
      examples: [
        "一个功能同时改多个仓库，而且必须经过显式 review。",
        "一次科研迭代既有本地代码修改，也有集群作业和稍后唤醒。",
        "Planner、Executor、Reviewer 和人类操作员之间需要稳定交接。",
        "你想一眼看到哪些任务可执行、哪些被阻塞、哪些在等待。"
      ],
      terminalLabel: "典型控制循环",
      terminalLines: [
        "$ alice-code-army repo-reconcile",
        "读取 campaign repo 真相源",
        "判断可执行 / 阻塞 / 等待状态",
        "派发下一步有边界的任务",
        "把结果和审阅回写到仓库"
      ],
      signals: [
        {
          title: "多仓库任务",
          body: "一个目标同时牵涉多个代码仓库时，仍然能保持边界清楚。"
        },
        {
          title: "长任务与集群实验",
          body: "本地修改、远程作业、等待时间和后续唤醒可以挂在同一条线索上。"
        },
        {
          title: "人工审批与 review",
          body: "计划批准、review 结论和是否重开，都放在能追溯的仓库产物里。"
        },
        {
          title: "仓库内可追溯报告",
          body: "Live report 来自同一套任务包和 review 证据，不是另外写一份表面摘要。"
        }
      ]
    },
    why: {
      eyebrow: "为什么需要 CodeArmy",
      title: "因为聊天记录不是长期项目系统。",
      body:
        "短任务靠聊天就够了。长任务一旦跨仓库、跨人、跨计算面，状态就会开始漏。CodeArmy 的价值，就是把这些状态留在能复查、能恢复的地方。",
      problems: [
        {
          title: "计划会淹没在对话里",
          body: "聊多了以后，真正的任务边界、验收条件和下一步动作很难再准确找回来。"
        },
        {
          title: "长作业会跑得比人更久",
          body: "集群作业、等待中的检查和后续唤醒还在继续，但人的上下文已经断了。"
        },
        {
          title: "review 和 rerun 证据四处分散",
          body: "提交、审阅结论、日志和后续动作常常散落在不同线程和工具里。"
        },
        {
          title: "多仓库修改容易失去边界",
          body: "如果没有明确 scope，就会越来越难判断哪些修改是一组、哪些依赖还没闭合。"
        }
      ]
    },
    capabilities: {
      eyebrow: "CodeArmy 能做什么",
      title: "它提供的是一份长任务协作合同。",
      body:
        "重点不是把描述说得多抽象，而是让下一步动作更清楚、当前状态更可查、review 证据更容易回看。",
      features: [
        {
          title: "把一个目标拆成可审阅的任务包",
          body: "计划会落成 phase、task、依赖、write scope 和 acceptance，而不是一串模糊待办。"
        },
        {
          title: "告诉你哪些任务能做、哪些被阻塞、哪些在等待",
          body: "Reconcile 直接从仓库真相源推导队列，而不是依赖操作员记忆。"
        },
        {
          title: "把人工批准留在流程里",
          body: "计划批准、review 结论和 reopen 决策都是显式状态，不靠默认理解。"
        },
        {
          title: "在隔离执行面里推进工作",
          body: "Source repo、分支、worktree 和远程作业都保持边界清楚、责任明确。"
        },
        {
          title: "让长任务可以被唤醒接回",
          body: "等训练、等评估、等外部证据，不再意味着主线状态丢失。"
        },
        {
          title: "把状态和报告写回仓库",
          body: "驱动执行的那套任务产物，本身也能支撑 live report 和最终总结。"
        }
      ]
    },
    flow: {
      eyebrow: "流程",
      title: "循环很简单：定目标、出计划、做任务、审结果、再回填。",
      body:
        "这是站在用户视角的一条主线。每一步都会留下产物，方便下一位人或 agent 继续接手。",
      nodes: [
        {
          step: "01",
          title: "明确目标",
          body: "先把本轮目标、涉及仓库和执行边界说清楚。",
          artifact: "campaign.md"
        },
        {
          step: "02",
          title: "生成计划并批准",
          body: "把目标落成 phase 和 task package，需要时先过人工批准门。",
          artifact: "plans/ + task packages"
        },
        {
          step: "03",
          title: "在隔离范围内执行",
          body: "任务在隔离的仓库、分支、worktree 或作业环境中推进。",
          artifact: "results/ + commit anchors"
        },
        {
          step: "04",
          title: "审阅并回填",
          body: "Reviewer 的结论、疑点和后续动作，写回任务本身所在的位置。",
          artifact: "reviews/"
        },
        {
          step: "05",
          title: "Reconcile 后进入下一轮",
          body: "刷新 campaign 状态，暴露 blocker，再决定下一波动作。",
          artifact: "live-report.md"
        }
      ]
    },
    cases: {
      eyebrow: "真实案例",
      title: "这不是给演示用的小任务，而是给现实里已经很乱的工作。",
      body:
        "下面这些是 Alice / CodeArmy 当前工作环境里已经存在的典型 campaign 形态，不是凭空编出来的营销例子。",
      items: [
        {
          title: "CodeArmy 站点改版",
          summary:
            "用一个 campaign 管网站定位、双语修复、内容审阅和最终发布，而不是边聊边改。",
          bullets: [
            "内容改写和界面修复分成明确任务，而不是混在同一轮聊天里。",
            "Review 记录会说明为什么通过，或者为什么打回。",
            "收口时可以直接用 live report 对齐真实仓库状态。"
          ]
        },
        {
          title: "FastEcalSim 恢复任务",
          summary:
            "把本地代码修改、smoke test、集群作业、checkpoint 检查和后续唤醒放在一条可追溯主线上。",
          bullets: [
            "任务包能直接指到 worktree、脚本、checkpoint 和质量门槛。",
            "外部评估证据没回来时，blocked 状态会被显式保留下来。",
            "交接说明仍然挂在同一个 campaign 下，不会漂到新线程。"
          ]
        },
        {
          title: "JUNOSW 多仓库调优",
          summary:
            "让文档仓库、代码仓库、历史证据和 phase gate 统一落在一套规划面里。",
          bullets: [
            "旧 archive 只作为参考证据，不会悄悄污染当前主线真相源。",
            "Repository issues 和依赖阻塞可以由 reconcile 自动暴露。",
            "下一步动作不需要再靠表格和人工状态板维护。"
          ]
        }
      ]
    },
    repo: {
      eyebrow: "为什么必须仓库优先",
      title: "CodeArmy 选择仓库优先，因为恢复工作只能靠仓库。",
      body:
        "聊天可以帮助人和 agent 推进协作，但真正发生了什么、当前走到哪一步、下一步能不能继续，必须落在仓库里。只有这样，中断、交接和 review 才可靠。",
      points: [
        "新的 agent 可以直接从仓库产物重启，而不用回放一整周聊天。",
        "Review 面对的是和执行同一份 task package，而不是事后整理的摘要。",
        "报告只是对仓库真相源做总结，不替代底层证据。",
        "人类在批准下一步之前，可以先看清楚当前真实状态。"
      ],
      treeTitle: "Campaign repo 里通常放什么",
      treeIntro:
        "这套结构故意保持纯文本和可 diff，目的是方便检查、审阅和接力，而不是做成花哨黑盒。",
      treeLines: [
        "campaign.md",
        "plans/proposals/",
        "plans/merged/master-plan.md",
        "phases/Pxx/tasks/Txxx/task.md",
        "phases/Pxx/tasks/Txxx/reviews/R001.md",
        "reports/live-report.md"
      ]
    },
    quickstart: {
      eyebrow: "快速入门",
      title: "最快理解 CodeArmy 的方式，仍然是从仓库出发。",
      body:
        "如果你想快速上手，就先建一个 campaign repo，然后把控制循环跑一遍。",
      steps: [
        {
          step: "01",
          title: "建立 campaign 外壳",
          body: "从真实目标和需要协作的仓库列表开始。",
          command: "alice-code-army create\nalice-code-army bootstrap"
        },
        {
          step: "02",
          title: "扫描仓库和边界",
          body: "先把 source repo 和执行面写清楚，再派发任务。",
          command: "alice-code-army repo-scan"
        },
        {
          step: "03",
          title: "执行 reconcile",
          body: "让系统从仓库真相源里推导计划状态、可执行任务和阻塞项。",
          command: "alice-code-army repo-reconcile"
        },
        {
          step: "04",
          title: "批准、执行、审阅",
          body: "保留人工门控，再把执行和 review 证据写回同一 campaign。",
          command: "alice-code-army approve-plan"
        }
      ],
      links: [
        { label: "Alice Runtime 仓库", href: "https://github.com/Alice-space/alice" },
        { label: "CodeArmy Site 仓库", href: "https://github.com/Alice-space/codearmy-site" }
      ],
      callout:
        "如果你是在排查系统自己，就要把 runtime repo 和 campaign repo 一起看：前者解释控制流，后者保存长期状态。"
    },
    closing: {
      title: "好的开源编排层，不该显得神秘，而该显得能查、能接、能恢复。",
      body:
        "CodeArmy 最有价值的时候，是它把长任务变得清楚：计划看得见，执行有边界，review 能回看，暂停之后还能继续。",
      primary: { label: "从流程开始看", href: "#flow" },
      secondary: { label: "浏览运行时代码", href: "https://github.com/Alice-space/alice" }
    },
    footer: {
      note: "给长周期编码、科研、审阅和报告使用的仓库优先协作层。"
    }
  }
};
