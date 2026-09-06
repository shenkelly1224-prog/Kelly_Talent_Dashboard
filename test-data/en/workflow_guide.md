# English Test Data Workflow Guide

## Overview

This test dataset simulates a mid-size company with 5 departments, 5 evaluators, and 15 review subjects. Use it to walk through the full talent review workflow end-to-end.

## Dataset Summary

| Department | Evaluator | Reports | Stars | Hi-Po | High Risk |
|---|---|---|---|---|---|
| Sales | James Chen | 4 | 2 | 2 | 1 |
| Product | Linda Lin | 3 | 2 | 2 | 1 |
| Engineering | David Zhao | 4 | 2 | 2 | 1 |
| Marketing | Sarah Zhou | 2 | 1 | 1 | 0 |
| Operations | Mike Sun | 2 | 1 | 1 | 1 |

**Total**: 15 subjects, 8 high-potentials, 4 at-risk employees

## Step-by-Step Workflow

### Step 1: Setup Wizard

1. Open `dist/en/index.html` in your browser
2. Enter as **Program Owner**, set password (e.g. `1234`)
3. The Setup Wizard opens automatically. Review or adjust:
   - Org name, project name
   - Performance levels (S/A/B/C/D), weights (0.2/0.3/0.5)
   - Potential dimensions and questions (4 dimensions x 4 questions = 16 questions, max 16 pts)
   - Risk questions (8 questions, max 40 pts per source)
4. Click **Save Configuration**

### Step 2: Import Data

1. Go to **Data Import/Export**
2. Import in this order:
   - **Evaluators**: `test-data/en/evaluator_import_test.csv` (5 evaluators)
   - **Review Subjects**: `test-data/en/personnel_import_test.csv` (15 people)
   - **Key Positions**: `test-data/en/position_import_test.csv` (8 positions)
3. Verify in **Base Data** modules that relationships are correct

### Step 3: Generate Distribution File

1. Click **Generate Distribution File** in Data Import/Export
2. An HTML file downloads — this is what evaluators would use

### Step 4: Simulate Assessment Collection

Instead of distributing files, use the pre-filled assessment results:

1. In **Data Import/Export**, scroll to **Collect Assessment Results**
2. Upload all 5 CSV files from `test-data/en/assessment_*.csv`
3. Click **View 9-Box Grid** to see the merged data

### Step 5: HRBP Risk Data (Optional)

1. Upload `test-data/en/hrbp_risk_test.csv` in the HRBP Risk Data section

### Step 6: Explore Results

- **9-Box Grid**: 15 people distributed across the matrix (drag to calibrate)
- **Succession Plan**: Key positions with Ready Now / 1-3 Yr / 3+ Yr candidates
- **Calibration**: 9-Box + Succession + IDP + Risk List + Cross-Mobility tabs
- **Dashboard**: Talent distribution, performance breakdown, risk alerts, dept comparison
- **Dev. Plan / IDP**: 8 high-potentials with expandable development plan editors

### Step 7: Export Calibrated Report

1. Go to **Calibration**
2. Click **Export Calibrated Report** in the top-right
3. A standalone HTML report downloads with all data

## Key Scenarios to Test

- **Star employees**: Alex Li (M001), Steven Sun (M009), Lisa Luo (M013)
- **High risk**: Tina Wu (M007, score 65), Ryan Liu (M003, score 40), Tom Gao (M014, score 45)
- **Succession**: Frank Yang (M006) → Product Director (1-3 Yr), Steven Sun (M009) → Engineering Director (1-3 Yr)
- **Cross-team mobility**: Kevin Zhang (M004) willing to move to e-commerce
- **IDP editing**: Expand any high-potential, fill in goals and action plans

