# AWS AI Silicon Decision — Webpage Guide

This guide explains the exhibit section by section, including what each interaction means and how the displayed calculations are derived. The main report, [Build, Buy, or Both? AWS's AI Silicon Decision](./Build,%20Buy,%20or%20Both%20AWS's%20AI%20Silicon%20Decision.md), contains the case narrative and references.

## Context: the decision in August 2023

The opening section presents the case as a decision AWS leadership faced in August 2023—not as a decision made with knowledge of later outcomes. The three pressures are supply constraints, the cost of buying accelerators from Nvidia, and AWS's slowing growth. The recommendation is to continue offering Nvidia while developing custom silicon and securing an anchor customer.

The dual-track approach is a hedge: AWS retains access to the established GPU ecosystem while creating another source of compute. An anchor customer can make demand less uncertain during the expensive early generations. “Illustrative” values elsewhere on the page are assumptions for analysis; AWS does not publish the relevant chip-generation costs.

## 1. Engineering economics: the volume threshold

### What the controls mean

- **Fixed cost per generation:** the assumed up-front chip design, software, and program cost.
- **GPU-equivalent 4-year cost:** the assumed total cost of an equivalent accelerator over four years. The case uses $50,000 as an illustrative estimate.
- **Custom-chip saving:** the assumed fraction saved per deployed custom accelerator compared with the GPU-equivalent.
- **Chips deployed:** the volume over which those per-chip savings accumulate.

Scenario buttons load example assumptions. “Project Rainier” uses about 500,000 chips as the later reported deployment scale; the 40% saving remains an illustrative model assumption, not a measured Rainier saving.

### Calculations

Let:

- \(F\) = fixed generation cost in dollars
- \(C\) = GPU-equivalent cost per chip
- \(s\) = custom-chip saving rate
- \(Q\) = chips deployed

Then:

\[
\text{Saving per chip}=C\times s
\]

\[
\text{Break-even volume}=\frac{F}{C\times s}
\]

At the starting assumptions:

\[
\$50{,}000\times40\%=\$20{,}000\text{ saved per chip}
\]

\[
\frac{\$3{,}000{,}000{,}000}{\$20{,}000}=150{,}000\text{ chips}
\]

At 250,000 chips, modeled savings are \(250{,}000\times\$20{,}000=\$5.0\) billion. Subtracting the $3.0 billion fixed cost gives **+$2.0 billion before switching and other excluded costs**. The volume margin is \(250{,}000-150{,}000=100{,}000\) chips.

The chart compares deployed volume with the break-even threshold. Above it, the simplified model's accumulated savings exceed fixed cost; below it, they do not. This is not a full NPV or total-cost-of-ownership analysis.

## 2. Strategy cards: compare expected value and trade-offs

The three displayed strategies are:

- **Nvidia only:** retains the mature performance and software ecosystem, but remains exposed to Nvidia pricing and supply.
- **Dual-track + anchor:** keeps Nvidia while developing custom silicon with guaranteed early demand.
- **All-in custom:** offers more upside if the chips succeed and adoption is high, but has the largest modeled failure loss.

**Expected NPV** is the probability-weighted average of the modeled outcomes. A positive expected value does not guarantee a positive result in any particular scenario.

### Illustrative expected-value calculations

**Nvidia only**

\[
0.50(-\$4B)+0.50(\$0B)=-\$2.0B
\]

**Dual-track**

\[
0.75[0.60(\$8B)+0.40(\$1B)]+0.25(-\$3B)=+\$3.15B
\]

**All-in custom**

\[
0.75[0.60(\$10B)+0.40(-\$4B)]+0.25(-\$12B)=+\$0.30B
\]

These are illustrative decision-tree values, not AWS-issued forecasts. The card bars are qualitative visual cues, not inputs to the expected-value calculations. In order, they sketch performance, cost efficiency, supply resilience, and execution risk; higher execution risk is unfavorable.

## 3. Decision analysis: probabilities, outcomes, and information value

The tree separates a decision AWS controls (its sourcing strategy) from uncertain outcomes (supply squeeze, technical success, and adoption). The probability controls change the modeled chance that the chip works and, if it works, the chance of high adoption. Low adoption is the complement: \(1-P(\text{high adoption})\).

For any strategy:

\[
\text{Expected value}=\sum_i P(\text{outcome}_i)\times\text{NPV}_i
\]

For dual-track, at the default probabilities:

\[
0.75[0.60(\$8B)+0.40(\$1B)]+0.25(-\$3B)=+\$3.15B
\]

### Why the value-of-information example is separate

The value-of-information strip is about a **later capacity decision, conditional on the chip working**. It compares two capacity choices:

- Large capacity: +$8B with high adoption; −$2B with low adoption.
- Small capacity: +$3B with high adoption; +$1B with low adoption.

At 60% high adoption, without a signal AWS selects the capacity choice with the greater expected payoff:

\[
\text{Large}=0.60(\$8B)+0.40(-\$2B)=\$4.0B
\]
\[
\text{Small}=0.60(\$3B)+0.40(\$1B)=\$2.2B
\]

If adoption were known before choosing capacity, the high-adoption case gets the large payoff and the low-adoption case gets the small payoff:

\[
\text{With signal}=0.60(\$8B)+0.40(\$1B)=\$5.2B
\]
\[
\text{Value of information}=\$5.2B-\max(\$4.0B,\$2.2B)=\$1.2B
\]

The adoption slider recalculates those values. The chip-works slider affects strategy expected values but not this conditional capacity calculation. This distinction prevents treating the $1.2B information value as the difference between the dual-track strategy's expected NPV and the signal-assisted scale payoff.

## 4. Real options: the option to wait and scale

The static view treats the capacity investment as immediate and irreversible:

\[
\text{Static NPV}=\$6.0B-\$7.0B=-\$1.0B
\]

It therefore suggests not scaling immediately. The real-options view allows AWS to wait for demand information and exercise only when the projected savings justify the $7.0 billion commitment. The option to avoid investing in weak-demand outcomes has value.

The exhibit uses an illustrative two-step binomial model with \(S_0=\$6.0B\), \(K=\$7.0B\), annual volatility \(\sigma=50\%\), decision horizon \(T=2\) years, and risk-free rate \(r=4.5\%\). Each step is one year:

\[
u=e^{\sigma\sqrt{\Delta t}}=e^{0.5}=1.649,\quad d=1/u=0.607
\]
\[
p=\frac{e^{r\Delta t}-d}{u-d}\approx0.422
\]

At year two, the savings values are \(S_0u^2\approx\$16.3B\), \(S_0ud=\$6.0B\), and \(S_0d^2\approx\$2.2B\). The exercise payoff in each branch is:

\[
\max(S-K,0)
\]

Only the high branch has a positive terminal exercise payoff: about \(\$16.3B-\$7.0B=\$9.3B\). Discounting expected option payoffs backward through the tree gives approximately **+$1.5B** today. This is an option valuation under the stated assumptions, not a reported AWS valuation.

## 5. The reveal: forecast versus later outcome

The final section switches from the August 2023 decision frame to subsequent reported outcomes. The 150,000-chip point is the illustrative break-even threshold from Section 1. The roughly 500,000 chips at Project Rainier and the $20B+ annual run rate are later case-reported figures, not outputs of the break-even model.

The simple volume comparison is:

\[
500{,}000-150{,}000=350{,}000\text{ chips above modeled break-even}
\]

This does not establish actual project profitability: the exhibit does not know AWS's actual costs, utilization, savings per chip, or full switching and operating costs.

The four evidence gates turn the recommendation into a staged rule:

- **Economics:** verify at least 30% savings per completed workload after porting costs.
- **Performance:** meet service targets for relevant workloads.
- **Adoption:** see continuing paid use outside Amazon.
- **Supply:** avoid replacing Nvidia dependence with another single point of failure.

The gate controls are presentation aids. Clicking one changes its displayed status; it does not verify the underlying evidence. The page starts with three gates marked met and supply open to emphasize that the supply question remains unresolved.

## Using the exhibit in a presentation

Use the slides for the narrative and the webpage for the calculations. Begin with the 2023 context, use the break-even controls to show the effect of volume and savings, then discuss the strategy tree and scale-specific information value. Reveal the real-options estimate only when explaining why waiting can be valuable. End by comparing the 2023 threshold with later reported demand, while keeping modeled assumptions separate from historical facts.
